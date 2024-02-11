import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './Navbar';

class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inventories: [],
            isLoading: true
        };
    }
    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/inventories')
        .then(responser => responser.json())
        .then(data => this.setState({inventories: data, isLoading: false}));
    }

    removeInv = async (id) => {
        await fetch (`/api/inventory/${id}`, {
            method: 'DELTE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log("Remove Done!");

        let updatedInvetories = 
        [...this.state.inventories].filter(i => i._id !== id);
        this.setState({inventories: updatedInvetories});
    }
    render() {
            const {inventories, isLoading} = this.state;

            if(isLoading) {
                return <p>Loading...</p>
            }
            const inventoryList = inventories.map(inventory => {
                return <tr key={inventory._id}>
                    <td style={{whiteSpace: 'nowrap'}}>{inventory.prodname}</td>
                    <td>{inventory.qty}</td>
                    <td>{inventory.price}</td>
                    <td>{inventory.status}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={"/inventories/" + inventory._id}
                            >Edit</Button>
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => this.removeInv(inventory._id)}
                            >Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            })
        return(
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="success"
                            className="my-4"
                            tag={Link}
                            to="/inventories/new"
                        >Add inventory</Button>
                    </div>
                    <h3>Inventory List</h3>
                    <Table className="mt-4">
                        <thead>
                            <th width="20%">Product Name</th>
                            <th width="15%">Quantity</th>
                            <th width="15%">Price</th>
                            <th width="15%">Status</th>
                            <th width="15%">Actions</th>
                        </thead>
                        <tbody>
                            {inventoryList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default InventoryList;