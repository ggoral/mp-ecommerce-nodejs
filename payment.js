const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
    integrator_id: process.env.INTEGRATOR_ID,
});

function call({title, price, quantity, image}) {
    const url = process.env.URL;
    const external_reference = process.env.EXTERNAL_REFERENCE;
    let picture_url = (new URL(image, [process.env.URL])).href;
    console.log(`title: ${title}, type: ${typeof(title)}`);
    console.log(`quantity: ${quantity}, type: ${typeof(quantity)}`);
    const preference = {
      collector_id: 469485398,
      items: [
        {
          id: '1234',
          title,
          description: "Dispositivo móvil de Tienda e-commerce",
          quantity: parseInt(quantity),
          unit_price: parseFloat(price),
          picture_url
        }
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: 22223333
        },
        address: {
          street_name: "False",
          street_number: 123,
          zip_code: "1111"
        },
      },
      back_urls: {
        success: `${url}/success`,
        pending: `${url}/pending`,
        failure: `${url}/failure`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [{id: "amex"}],
        excluded_payment_types: [{id: "atm"}],
        installments: 6,
      },
      external_reference,
      notification_url: `${url}/notifications`,
      };

    return mercadopago.preferences.create(preference);
}

module.exports = { call }
