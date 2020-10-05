const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN,
    //integrator_id: process.env.INTEGRATOR_ID,
});

const detail = (req, res) => {
  const site = process.env.URL;
  const { img, title, price, unit } = req.query;
  let picture_url = new URL(img, [site]);
  picture_url = picture_url.href;

  const external_reference = "goral.gonzalo@gmail.com";

  const preference = {
    collector_id: 469485398,
    items: [
      {
        id: 1234,
        title,
        description: "Dispositivo móvil de Tienda e-commerce",
        quantity: parseFloat(unit),
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
      success: `${site}/success`,
      pending: `${site}/pending`,
      failure: `${site}/failure`,
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "amex",
        }
      ],
      excluded_payment_types: [
        {
          id: "atm",
        }
      ],
      installments: 6,
    },
    external_reference,
    notification_url: `${site}/notifications`,
  };

  mercadopago.preferences.create(preference).then(function (data) {
    res.render('detail', {
      ...req.query,
      init_point: data.body.init_point
    });
  }).catch(function (error) {
    console.log(error);
    res.status(500).send({
      message: error
    });
  });
}

module.exports = detail;
