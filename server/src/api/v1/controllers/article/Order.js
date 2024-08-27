const Order = require("../../models/article/Order");
const DetailsOrder = require("../../models/article/DetailsOrder");
const StockMovement = require("../../models/article/StockMovement");
const User = require("../../models/users/User");
//
const { Op } = require("sequelize");
const uuid = require("uuid");

module.exports = {
  async create(req, res) {
    try {
      const {
        user_id,
        order_dates,
        order_quantity,
        order_discount,
        order_discount_type,
        order_pay_from_discount,
        order_pay_mode,
        order_status,
        order_details,
        customer,
      } = req.body;

      const countOrders = await Order.count({});
      const code =
        "CMD-" +
        new Date().getFullYear() +
        (new Date().getMonth() + 1) +
        (new Date().getDay() + 1) +
        new Date().getMilliseconds() +
        (countOrders + 1);
      const order = await Order.create({
        user_id,
        dates: order_dates,
        code,
        total_quantity: order_quantity,
        discount_type: order_discount_type,
        discount: order_discount,
        pay_from_discount: order_pay_from_discount,
        pay_mode: order_pay_mode,
        customer: customer.toLowerCase(),
        status: order_status,
      });
      if (order) {
        for (let i = 0; i < order_details.length; i++) {
          const element = order_details[i];
          await DetailsOrder.create({
            order_id: order?.id,
            article_id: element?.article_id,
            quantity: element?.article_quantity,
            discount: element?.discount,
            discount_type: element?.discount_type,
            pay_from_discount: element?.pay_from_discount,
            total_price: element?.total_price,
          });
          if (order_status == "delivered") {
            await StockMovement.create({
              article_id: element?.article_id,
              dates: order_dates,
              type: "sortie",
              quantity: element?.article_quantity,
              description: "commande/vente",
            });
          }
        }
        return res.status(201).json({
          status: true,
          message: `Order ${code} for the customer ${customer.toUpperCase()} saved successfully.`,
          order,
        });
      }
      return res.status(400).json({
        status: false,
        message: "Order not saved. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error on create Order : ": error });
      return res.status(400).json({
        status: false,
        message: "catch error on create Order",
        error,
      });
    }
  },
  async get(req, res) {
    try {
      const _orders = await Order.findAll();
      const _detailsOrder = await DetailsOrder.findAll();
      if (_orders == "" || _orders == null) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No order available yet!",
        });
      }
      let ordersArray = [];
      for (let i = 0; i < _orders.length; i++) {
        const element = _orders[i];
        let detailsOrder = _detailsOrder.filter(
          (x) => x.order_id === element?.id
        );
        let user = await User.findAll({
          where: { id: element?.user_id },
          limit: 1,
        });
        //
        ordersArray.push({
          id: element?.id,
          user_id: element?.user_id,
          user_name: user[0]?.dataValues?.firstname + " " + user[0]?.dataValues?.lastname,
          dates: element?.dates,
          code: element?.code,
          total_quantity: element?.total_quantity,
          discount_type: element?.discount_type,
          discount: element?.discount,
          pay_from_discount: element?.pay_from_discount,
          pay_mode: element?.pay_mode,
          customer: element?.customer,
          status: element?.status,
          updated_at: element?.updated_at,
          created_at: element?.created_at,
          detailsOrder: detailsOrder,
        });
      }

      const ordersSorted = ordersArray.sort(function (a, b) {
        if (a.created_at < b.created_at) {
          return -1;
        }
      });
      const orders = ordersSorted;

      return res
        .status(200)
        .json({ status: true, length: orders.length, orders });
    } catch (error) {
      console.log({ "catch error get Orders ": error });
    }
  },
  async update(req, res) {
    try {
      const { telephone, address } = req.body;
      const { id } = req.params;

      const order = await Order.update(
        { telephone, address },
        { where: { id: id } }
      );

      if (entity) {
        return res.status(200).json({
          status: 1,
          message: "Order updated.",
          order,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
  async enabled(req, res) {
    try {
      const { stat, id } = req.params;

      const order = await Order.update(
        { status: stat == 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (order) {
        return res.status(200).json({
          status: 1,
          message: `Extension ${stat == 1 ? "Disabled" : "Enabled"}.`,
          order,
        });
      }
      return res.status(400).json({
        status: 0,
        message: "Extension not updated. Process failed.",
      });
    } catch (error) {
      console.log({ "catch error update extension ": error });
    }
  },
};
