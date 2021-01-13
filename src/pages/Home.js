import React, { useState, useContext, useEffect } from 'react'
import { useUsuario } from "../context/auth";
import { Form, Grid, Button } from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import Concept from '../components/Concept';
import TableIncomeAndDicount from "../components/TableIncomeAndDicount";
import { firestore } from "../util/init-firebase";

function Home() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const { user } = useUsuario();
    const [incomes, setIncomes] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState('');
    const [discountsCatalog, setDiscountsCatalog] = useState([]);
    const [incomesCatalog, setIncomesCatalog] = useState([]);
    let tableIncomes = [];

    useEffect(() => {
        //emplooyees
        firestore.collection("employees")
            .get()
            .then( snapshot => {
                const data = [];
                snapshot.forEach( doc => {
                    data.push({
                        key: doc.id,
                        text: doc.data().name,
                        value: doc.id
                    })
                });

                setEmployees(data)
            })
            .catch(error => console.log(error))

            firestore.collection('incomes')
            .get()
            .then( snapshot => {
                const incomes = [];
                snapshot.forEach( doc => {
                    incomes.push({
                        key: doc.id,
                        text: doc.data().name,
                        value: doc.id
                    });
                });

                setIncomesCatalog(incomes);
            })
            .catch( error => console.log(error));

        firestore.collection('discounts')
            .get()
            .then( snapshot => {
                const discounts = [];
                snapshot.forEach( doc => {
                    discounts.push({
                        key: doc.id,
                        text: doc.data().name,
                        value: doc.id
                    })
                });

                setDiscountsCatalog(discounts);
            })
            .catch( error => console.log(error))
    }, [])

    function generateCurrentDate(){
        let date = new Date();
        let months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        return `${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    function generateDateFormat(date){
        let dateFormat = new Date(date);
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

        return `${dateFormat.getDate()}/${months[dateFormat.getMonth()]}/${dateFormat.getFullYear()}`;
    }

    Array.prototype.sum = function (prop) {
        var total = 0;
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += parseInt(this[i][prop]);
        }
        return total
    }

    function getDifferenceDays (){
        let difference = new Date(endDate).getTime() - new Date(startDate).getTime();

        let days = Math.ceil(difference / (1000 * 3600 * 24));

        return days + 1;
    }


    function buildTableBody(columns) {
        var body = [];
        var dataRow = [];

        body.push(columns);

		incomes.forEach(function(row, index) {
            console.log(row, index)

            dataRow.push(
                {
                    income: row.name,
                    quantityIncome: row.quantity,
                    discount: discounts.length > 0 ? typeof discounts[index] === 'undefined' ? '' : discounts[index].name : '',
                    quantityDiscount: discounts.length > 0 ? typeof discounts[index] === 'undefined' ? '' : discounts[index].quantity : '',
                });
        });

        dataRow.forEach( function (row){
            body.push([row.income, row.quantityIncome, row.discount, row.quantityDiscount])
        })

        //totals
        body.push([
                    {
                        text: 'Total ingresos' ,
                        style: 'total'
                    },
                    {
                        text: incomes.sum('quantity'),
                        style: 'total'
                    },
                    {
                        text: 'Total deducciones',
                        style: 'total'
                    },
                    {
                        text: discounts.sum('quantity'),
                        style: 'total'
                    }
                ])
		return body;
	}

    function generatedPDF () {

        const date = `Fecha: Guatemala, ${generateCurrentDate()}`;

        const rangeDate = `Pago liquido por sueldo correspondiente: ${generateDateFormat(startDate)} - ${generateDateFormat(endDate)}`;

        const days = `Días laborados: ${getDifferenceDays()}`

        const amount = `Liquido a recibir: ${incomes.sum('quantity') - discounts.sum('quantity')}`

        const emp = employees.find( emp => emp.value === employee.value);

        let docDefinition = {
            content: [
                {
                    text: date, style: 'date'
                },
                {
                    text: 'Recibí de: RIASAM', style: 'company'
                },
                    rangeDate,
                    days,
                {
                    style: 'table',
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: ['*',100,'*',100],
                        body: buildTableBody(['Ingresos', '', 'Deducciones', ''])
                    }
                },
                {
                    text: amount, style: 'amount'
                },
                {
                    text: 'Firma: ______________________________________',
                    style: 'sign'
                },
                {
                    text: 'Empleado: ' + emp.text,
                    style: 'sign'
                },
                {
                    text: 'DPI: ',
                    style: 'sign'
                }
              ],

              styles: {
                date: {
                    alignment: 'center'
                },
                company: {
                    alignment: 'center',
                    bold: true,
                    marginBottom: 20
                },
                table: {
                    margin: [0, 20, 0, 10]
                },
                total: {
                    bold: true,
                    fontSize: 14
                },
                amount: {
                    margin: [0, 30, 0, 30],
                    alignment: 'center'
                },
                sign: {
                    alignment: 'center'
                },
                header: {
                  fontSize: 22,
                  bold: true,
                  alignment: 'right'
                },
                anotherStyle: {
                  italics: true,
                  alignment: 'right'
                }
              }
        }

        pdfMake.createPdf(docDefinition).open();


    }

    function handleChange (event,data) {
        event.preventDefault();
        const { value } = data || event.target;

        const id = employees.find( emp => emp.value === value);

        setEmployee(id);
    }

    function handleDate (event,data) {

        const { name, value } = data || event.target;

        if (name === 'startDate'){
            setStartDate(value);
        }
        else{
            setEndDate(value);
        }
    }

    function addConcept(concept, type) {
        const index = type === 'INCOME' ? incomes.findIndex(e => e.id === concept.id) : discounts.findIndex(e => e.id === concept.id);
        let data = [];

        switch (type) {
            case 'DISCOUNT':
                    if (index != -1){
                        data = [...discounts];
                        data[index] = {
                            ...data[index],
                            quantity: concept.quantity
                        }

                        setDiscounts(data)
                    }else{
                        setDiscounts([...discounts,{...concept}])
                    }
                break;
            case 'INCOME':

                    if (index != -1){
                        data = [ ...incomes ];
                        data[index] = {
                            ...data[index],
                            quantity: concept.quantity
                        }
                        setIncomes(data);
                    }else{
                        setIncomes([...incomes,{...concept}])
                    }

                break;
            default:
                break;
        }
    }

    return (
        <>
        <Form style={{ marginBottom: 20 }}>
            <Form.Dropdown
                name="employee"
                label="Colaborador"
                onChange={handleChange}
                options={employees}
                fluid
                selection
                search
                placeholder='Colaborador'
            />

            <SemanticDatepicker label="Fecha inicio"
                                onChange={handleDate}
                                format="DD-MM-YYYY"
                                value={startDate}
                                allowOnlyNumbers={true}
                                name="startDate"/>

            <SemanticDatepicker label="Fecha fin"
                                onChange={handleDate}
                                format="DD-MM-YYYY"
                                value={endDate}
                                name="endDate"/>

            <Button content="Generar boleta"
                    icon="file pdf"

                    color="facebook"
                    onClick={generatedPDF}/>
        </Form>

            {
                employee &&

                <Grid columns={2} divided>
                    <Grid.Row>

                    <Grid.Column>
                        <h2>Ingresos</h2>
                        <Concept isDiscount={false} addConcept={addConcept} data={incomesCatalog}/>

                        {
                            incomes.length > 0 && <TableIncomeAndDicount data={incomes}/>
                        }
                    </Grid.Column>

                    <Grid.Column>
                        <h2>Descuentos</h2>
                        <Concept isDiscount={true} addConcept={addConcept} data={discountsCatalog}/>

                        {
                            discounts.length > 0 && <TableIncomeAndDicount data={discounts}/>
                        }
                        </Grid.Column>
                    </Grid.Row>


                </Grid>
            }
        </>
    )
}

export default Home
