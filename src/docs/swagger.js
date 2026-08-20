const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API para gestionar un Ecommerce básico.",
            version: "1.0.0",
            description: "Esta API permite gestionar PRODUCTOS, VENTAS, PAGOS MEDIANTE PAYPAL Y USUARIOS. Es un modelo de Ecommerce básico pero seguro, utilizando servicios de Authentication de Supabase permitiendo utilizar correo electrónico para logearse y dando seguridad a la API mediante JWT.",
        },
        servers: [ //estea array es para que swagger interprete que sea un combo box
            {
                url: ""
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                UserRequest: {
                    type: "object",
                    required: ["name", "role", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Federico",
                        },
                        role: {
                            type: "string",
                            example: "user",
                        },
                        email: {
                            type: "string",
                            description: "email del usuario",
                            example: "user@example.com",
                        },
                        password: {
                            type: "string",
                            description: "contraseña del usuario",
                            example: "12345678",
                        },
                    }
                },
                UserResponse: {
                    type: "object",
                    required: ["id"],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                            readOnly: true
                        },
                        name: {
                            type: "string",
                            example: "Federico",
                        },
                        role: {
                            type: "string",
                            example: "admin",
                        },
                        id_auth_supabase: {
                            type: "string",
                            description: "ID del usuario correspondiente en Supabase Auth",
                            readOnly: true,
                            example: "4e61d48f-4ab...",
                        },
                    }
                },

                SaleResponse: {
                    type: "object",
                    required: [""],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        id_user: {
                            type: "integer",
                            example: 1,
                        },
                        status: {
                            type: "string",
                            description: "estado de la venta",
                            example: "PENDIENTE",
                        },
                        total: {
                            type: "integer",
                            description: "total de la venta",
                            example: 0
                        },
                    },
                },

                SaleDetailRequest: {
                    type: "object",
                    required: ["id_product", "description", "price_sale", "amount", "total"],
                    properties: {
                        id_product: {
                            type: "integer",
                            example: 1,
                        },
                        amount: {
                            type: "integer",
                            example: 2,
                            description: "cantidad de producto seleccionado"
                        },
                    },
                },
                SaleDetailResponse: {
                    type: "object",
                    required: [],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        id_sales: {
                            type: "integer",
                            example: 1,
                        },
                        id_product: {
                            type: "integer",
                            example: 1,
                        },
                        description: {
                            type: "string",
                            description: "descripcion o nombre del producto",
                            example: "café",
                        },
                        price_sale: {
                            type: "numeric",
                            example: 50,
                            description: "precio del producto en venta"
                        },
                        amount: {
                            type: "integer",
                            example: 2,
                            description: "cantidad de producto seleccionado"
                        },
                        total: {
                            type: "numeric",
                            description: "precio total del producto seleccionado",
                            example: 100
                        },
                    },
                },

                PayPalPaymentRequest: {
                    type: "object",
                    required: ["id_sales"],
                    properties: {
                        id_sales: {
                            type: "integer",
                            description: "Identificador de la venta que se desea pagar",
                            example: 1
                        },
                    },
                },
                PayPalPaymentResponse: {
                    type: "object",
                    required: ["redirectUrl"],
                    properties: {
                        redirectUrl: {
                            type: "string",
                            description: "URL de PayPal a la que se debe redirigir al usuario para aprobar el pago",
                            example: "https://www.sandbox.paypal.com/checkoutnow?token=..."
                        },
                    },
                },

                PayPalPaymentExecuteResponse: {
                    type: "object",
                    required: ["payment"],
                    properties: {
                        payment: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "string",
                                    description: "Identificador del pago generado por PayPal",
                                    example: "PAY-123456789"
                                },
                                intent: {
                                    type: "string",
                                    example: "sale"
                                },
                                state: {
                                    type: "string",
                                    description: "Estado del pago",
                                    example: "approved"
                                },
                                payer: {
                                    type: "object",
                                    properties: {
                                        payment_method: {
                                            type: "string",
                                            example: "paypal"
                                        },
                                        status: {
                                            type: "string",
                                            example: "VERIFIED"
                                        }
                                    }
                                },
                                transactions: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            amount: {
                                                type: "object",
                                                properties: {
                                                    total: {
                                                        type: "string",
                                                        example: "100.00"
                                                    },
                                                    currency: {
                                                        type: "string",
                                                        example: "USD"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                ProductRequest: {
                    type: "object",
                    required: ["name", "price", "image"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Cerveza",
                            description: "Nombre del producto"
                        },
                        price: {
                            type: "integer",
                            example: 5,
                            description: "Precio del producto"
                        },
                        image: {
                            type: "string",
                            example: "https://i.ibb.co/Y4w1wpfx/Captura-de-pantalla-2026-05-21-221402.png",
                            description: "Imagen del producto"
                        },
                    }
                },
                ProductResponse: {
                    type: "object",
                    required: [""],
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                            description: "ID del producto"
                        },
                        name: {
                            type: "string",
                            example: "Cerveza",
                            description: "Nombre del producto"
                        },
                        price: {
                            type: "integer",
                            example: 5,
                            description: "Precio del producto"
                        },
                        image: {
                            type: "string",
                            example: "https://i.ibb.co/Y4w1wpfx/Captura-de-pantalla-2026-05-21-221402.png",
                            description: "Imagen del producto"
                        },
                    }
                },

                RegisterRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "12345678",
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "12345678",
                        },
                    },
                },

            }
        }
    },
    apis: ["./src/routes/*.js"] //direccion de la carpeta routes, va a "tomar" todos los archivos .js
}
const swaggerSpec = swaggerJSDoc(options);
const setupSwaggerDocs = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)) //ruta de documentacion de APIS
    console.log("Swagger docs disponible en la ruta https://servidor-tareas-express-ykew.onrender.com/api-docs")
}

module.exports = setupSwaggerDocs