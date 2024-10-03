import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function SalesData() {
    const [rows, setRows] = useState({
        "rows": [
            {
                "id": "electronics",
                "label": "Electronics",
                "value": 0,
                "inputValue": '',
                "variance": 0,
                "children": [
                    {
                        "id": "phones",
                        "label": "Phones",
                        "value": 800,
                        "inputValue": '',
                        "variance": 0
                    },
                    {
                        "id": "laptops",
                        "label": "Laptops",
                        "value": 700,
                        "inputValue": '',
                        "variance": 0
                    }
                ]
            },
            {
                "id": "furniture",
                "label": "Furniture",
                "value": 0,
                "inputValue": '',
                "variance": 0,
                "children": [
                    {
                        "id": "tables",
                        "label": "Tables",
                        "value": 300,
                        "inputValue": '',
                        "variance": 0
                    },
                    {
                        "id": "chairs",
                        "label": "Chairs",
                        "value": 700,
                        "inputValue": '',
                        "variance": 0
                    }
                ]
            }
        ]
    });

    // Calculate parent values based on children
    useEffect(() => {
        const updatedRows = rows.rows.map(row => {
            const childrenTotal = row.children.reduce((acc, child) => acc + child.value, 0);
            return { ...row, value: childrenTotal };
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    }, [rows.rows]);

    // Handle Parent percentage allocation
    const handleParentAllocation = (parentId) => {
        const updatedRows = rows.rows.map(row => {
            if (row.id === parentId) {
                const newvalue = row.inputValue - row.value;
                const variance = ((newvalue / row.value) * 100);

                return {
                    ...row,
                    // value: parentnewvalue,
                    variance: variance.toFixed(2),
                };
            }
            return row;
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    };

    //Handle Parent value allocation
    const handleParentAllocationValue = (parentId) => {
        const updatedRows = rows.rows.map(row => {
            if (row.id === parentId) {
                const newvalue = row.inputValue - row.value;
                const variance = ((newvalue / row.value) * 100);

                return {
                    ...row,
                    // value: parentnewvalue,
                    variance: variance.toFixed(2),
                };
            }
            return row;
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    };

    // Handle child percentage allocation
    const handleAllocation = (parentId, childId) => {
        const updatedRows = rows.rows.map(row => {
            if (row.id === parentId) {
                const updatedChildren = row.children.map(child => {
                    if (child.id === childId) {
                        const newValue = child.value + (child.value * child.inputValue) / 100;
                        const variance = ((newValue - child.value) / child.value) * 100;
                        return {
                            ...child,
                            value: newValue,
                            variance: variance.toFixed(2),
                            inputValue: ''
                        };
                    }
                    return child;
                });
                return {
                    ...row,
                    children: updatedChildren
                };
            }
            return row;
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    };

    //Handle value allocation
    const handleAllocationvalue = (parentId, childId) => {
        const updatedRows = rows.rows.map(row => {
            if (row.id === parentId) {
                const updatedChildren = row.children.map(child => {
                    if (child.id === childId) {
                        const newValue = child.inputValue;
                        const variance = ((newValue - child.value) / child.value) * 100;
                        return {
                            ...child,
                            value: newValue,
                            variance: variance.toFixed(2),
                            inputValue: ''
                        };
                    }
                    return child;
                });
                return {
                    ...row,
                    children: updatedChildren
                };
            }
            return row;
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    };

    // Handle input change
    const handleInputChange = (parentId, childId, value) => {
        const updatedRows = rows.rows.map(row => {
            if (row.id === parentId) {
                const updatedChildren = row.children.map(child => {
                    if (child.id === childId) {
                        return {
                            ...child,
                            inputValue: Number(value)
                        };
                    }
                    return child;
                });

                return {
                    ...row,
                    children: updatedChildren
                };
            }
            return row;
        });

        setRows(prevState => ({
            ...prevState,
            rows: updatedRows
        }));
    };

    return (
        <div>
            <h2 className='fw-bold mx-3 my-3'>Sales Data</h2>
            <div className='container'>
                <table className="table table-bordered justify-content-center align-items-center">
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Value</th>
                            <th>Input</th>
                            <th>Allocation %</th>
                            <th>Allocation Val</th>
                            <th>Variance %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.rows.map((item) => (
                            <>
                                <tr key={item.id}>
                                    <td>{item.label}</td>
                                    <td>{item.value}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className='form-control'
                                            value={item.inputValue}
                                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleParentAllocation(item.id)}>Allocate %</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleParentAllocationValue(item.id)}>Allocation Val</button>
                                    </td>
                                    <td>{item.variance}%</td>
                                </tr>
                                {item.children.map((child) => (
                                    <tr key={child.id}>
                                        <td>-- {child.label}</td>
                                        <td>{child.value}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className='form-control'
                                                value={child.inputValue}
                                                onChange={(e) => handleInputChange(item.id, child.id, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleAllocation(item.id, child.id)}>Allocate %</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleAllocationvalue(item.id, child.id)}>Allocation Val</button>
                                        </td>
                                        <td>{child.variance}%</td>
                                    </tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesData;
