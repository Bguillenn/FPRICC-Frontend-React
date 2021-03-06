import React, {FormEvent, useState} from "react";
import {useHistory} from "react-router";
import {SERVER_PATH} from "@/variables";

/** Data of the user to register */
export interface RegistrationData {
    name: string,
    lastname: string,
    email: string,
    password: string,
}

/** Abstraction of the response of the server */
export interface ResponseData {
    /** Signals whether the response is in the range of HTTP 200-2009 */
    ok: boolean,
    /** The possible response of the server, only if `ok` is `true` */
    json?: {
        /** Response of the server. Should always be "registro exitoso" */
        message: string,
        [key: string]: string | undefined,
    }
}

/**
 * A function that abstracts the process of communicating with the server to register.
 * The return promise should never reject. Instead, the error data should be sent
 * via the success payload.
 */
type RegisterFunction = (data: RegistrationData) => Promise<ResponseData>


const defaultRegisterFn: RegisterFunction = (data) => new Promise((resolve) => {
    fetch(`${SERVER_PATH}/api/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            password_confirmation: data.password,
        }),
    })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((jsonObj) => {
                        resolve({
                            ok: true,
                            json: jsonObj,
                        });
                    });
            } else {
                resolve({ok: false});
            }
        });
});

type alertStyle = { display: "none" | "block" }

function useAlertStyle() {
    return useState<alertStyle>({display: "none"});
}

export default function Register(props: { registerFn?: RegisterFunction }) {
    // Default values
    const registerFunction = props.registerFn ?? defaultRegisterFn;

    const [nameAlertStyle, setNameAlertStyle] = useAlertStyle();
    const [emailAlertStyle, setEmailAlertStyle] = useAlertStyle();
    const [passwordAlertStyle, setPasswordAlertStyle] = useAlertStyle();
    const [registrationErrorStyle, setRegistrationErrorStyle] = useAlertStyle();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const register = async(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (!name || name.length === 0) {
            setNameAlertStyle({display: "block"});
        }

        if (!email || email.length === 0) {
            setEmailAlertStyle({display: "block"});
        }

        if (!password || password.length === 0) {
            setPasswordAlertStyle({display: "block"});
        }

        if (name && email && password) {
            const response = await registerFunction({
                name,
                lastname,
                email,
                password,
            });
            if (response.ok) {
                history.push("/admin/dashboard");
            } else {
                setRegistrationErrorStyle({display: "block"});
            }
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                        >
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Registrarse con credenciales</small>
                                </div>
                                <form
                                    onSubmit={(ev) => {
                                        register(ev);
                                    }}
                                >
                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={nameAlertStyle}>
                                            "Nombre" est?? vacio.
                                        </div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-name"
                                        >
                                            Nombres
                                        </label>
                                        <input
                                            id="user-name"
                                            name="user-name"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Nombres"
                                            value={name}
                                            onChange={(x) => setName(x.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={nameAlertStyle}>
                                            "Apellidos" est?? vacio.
                                        </div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-lastname"
                                        >
                                            Apellidos
                                        </label>
                                        <input
                                            id="user-lastname"
                                            name="user-lastname"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Apellidos"
                                            value={lastname}
                                            onChange={(x) => setLastname(x.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={emailAlertStyle}>
                                            "Email" est?? vacio.
                                        </div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="user-email"
                                            name="user-email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(x) => setEmail(x.target.value)}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <div className="text-red-500 font-bold" style={passwordAlertStyle}>
                                            La contrase??a est?? vacia.
                                        </div>
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="user-password"
                                        >
                                            Contrase??a
                                        </label>
                                        <input
                                            type="password"
                                            id="user-password"
                                            name="user-password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Contrase??a"
                                            value={password}
                                            onChange={(x) => setPassword(x.target.value)}
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <input
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            value="Crear cuenta"
                                        />
                                    </div>

                                    <div className="text-red-500 font-bold" style={registrationErrorStyle}>
                                        Error en el registro.
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
