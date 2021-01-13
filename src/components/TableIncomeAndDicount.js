import React from 'react'
import { Table } from "semantic-ui-react";

function TableIncomeAndDicount({data}) {

    const rows = data.map( concept => {
        return (
            <Table.Row key={concept.id}>
                <Table.Cell>{concept.name}</Table.Cell>
                <Table.Cell textAlign="center" >{concept.quantity}</Table.Cell>
            </Table.Row>
        )
    })

    Array.prototype.sum = function (prop) {
        var total = 0;
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += parseInt(this[i][prop]);
        }
        return total
    }

    const total = (
        <Table.Row >
            <Table.HeaderCell textAlign="center"> Total </Table.HeaderCell>
            <Table.HeaderCell textAlign="center"> { data.sum('quantity') } </Table.HeaderCell>
        </Table.Row>
    )
    return (
        <Table fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Concepto</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Cantidad</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {rows}
            </Table.Body>
            <Table.Footer>
                {total}
            </Table.Footer>
        </Table>
    )
}

export default TableIncomeAndDicount;