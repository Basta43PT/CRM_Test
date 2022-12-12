import React, { useState } from "react";

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

function Bla({ onClick, children }) {
    return (
        <div>
            <Button onClick={onClick}>{children}</Button>
        </div>
    );
}

export default function App() {
    const array = [
        { name: "goldstar", value: 0 },
        { name: "corona", value: 1 },
        { name: "taquilla", value: 1 },
        { name: "whiskey", value: 1 }
    ];

    const [value, setValue] = useState < any > (array);

    function updateObject(name: string, arr: any[]) {
        setValue(
            arr.map((obj) => {
                if (obj.name === name) {
                    return { name: obj.name, value: obj.value + 1 };
                }
                return obj;
            })
        );
    }

    return (
        <div className="App">
            {/* {value.map((v: any) => {
        return <div>{${v.name} = ${v.value}}</div>;
      })} */}
            {value.map((x) => {
                return (
                    <>
                        <div>{${x.name} = ${x.value}}</div>
                        <Bla
                            onClick={() => updateObject(x.name, value)}
                        >{buy ${x.name}}</Bla>
                    </>
                );
            })}
        </div>
    );
}