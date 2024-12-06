const Order = require("../../models/article/Order");
const DetailsOrder = require("../../models/article/DetailsOrder");
const StockMovement = require("../../models/article/StockMovement");
const Article = require("../../models/article/Article");
const User = require("../../models/users/User");
//
const { Op, Sequelize, fn, col } = require("sequelize");
const uuid = require("uuid");
const { formattedDateWithTZ, isEmpty } = require("../../../../utils/utils");

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
      // console.log({ "req.body ": req.body });

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
        message: "The Order request was not process.",
        error,
      });
    }
  },
  async get(_, res) {
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
          user_name:
            user[0]?.dataValues?.firstname +
            " " +
            user[0]?.dataValues?.lastname,
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
      return res
        .status(400)
        .json({ status: false, message: "catch error get Orders " });
    }
  },
  async getByKeys(req, res) {
    try {
      const { user_id, start, end, status } = req?.query;
      //
      const _start = formattedDateWithTZ(start);
      const _end = formattedDateWithTZ(end);
      //
      const _orders = await Order.findAll({
        where: {
          user_id: parseInt(user_id),
          dates: {
            [Op.gte]: _start,
            [Op.lte]: _end,
          },
          status: isEmpty(status) ? { [Op.ne]: null } : status,
        },
      });
      const _detailsOrder = await DetailsOrder.findAll();
      if (_orders == "" || _orders == null) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No order for specified parameters available yet!",
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
          user_name:
            user[0]?.dataValues?.firstname +
            " " +
            user[0]?.dataValues?.lastname,
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
      return res
        .status(400)
        .json({ status: false, message: "catch error get Orders " });
    }
  },
  async getByCode(req, res) {
    try {
      const { user_id, code } = req?.query;
      //
      const _orders = await Order.findAll({
        where: {
          user_id: user_id,
          code: code,
        },
      });
      const _detailsOrder = await DetailsOrder.findAll();
      if (_orders == "" || _orders == null) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No order for specified parameters available yet!",
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
          user_name:
            user[0]?.dataValues?.firstname +
            " " +
            user[0]?.dataValues?.lastname,
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
      console.log({ "catch error get Order by code ": error });
      return res
        .status(400)
        .json({ status: false, message: "catch error get Order by code " });
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
  async updateStatus(req, res) {
    try {
      const { status, id } = req.params;

      const order = await Order.update(
        { status: status },
        { where: { id: id } }
      );
      if (order) {
        return res.status(200).json({
          status: true,
          message: `Le statut actuel de la commande est : ${status}.`,
          order,
        });
      }
    } catch (error) {
      console.log({ "catch error update order status ": error });
      return res.status(400).json({
        status: false,
        message: "Le statut de la commande non modifié. Process failed.",
      });
    }
  },
  async dashboard(req, res) {
    try {
      const { date, timing } = req?.query;
      console.log({ "req?.query": req?.query });

      const { count, rows } = await Article.findAndCountAll();
      const _orders = await Order.findAll({});
      //
      statusArray = ["delivered", "approved", "pending", "canceled"];
      //
      let totalDelivered = 0;
      let totalApproved = 0;
      let totalPending = 0;
      let totalCanceled = 0;
      for (let i = 0; i < statusArray.length; i++) {
        const element = statusArray[i];
        let tmp = _orders.filter((item) => item?.status == element);
        const sumTmp = tmp?.reduce(
          (acc, current) => acc + current?.pay_from_discount,
          0
        );
        if (element == "delivered") totalDelivered = sumTmp;
        if (element == "approved") totalApproved = sumTmp;
        if (element == "pending") totalPending = sumTmp;
        if (element == "canceled") totalCanceled = sumTmp;
      }
      // processing threeLastOrders
      const reversedOrders = _orders.reverse();
      const threeLastOrders = reversedOrders.slice(0, 3);
      //
      const articles = await Article.findAll({});
      const _threeLastArticles = [];
      const _detailsOrders = await DetailsOrder.findAll({
        attributes: [
          "article_id",
          [Sequelize.fn("sum", Sequelize.col("quantity")), "total_quantity"],
          [
            Sequelize.fn("sum", Sequelize.col("pay_from_discount")),
            "total_amount",
          ],
        ],
        group: ["article_id"],
      });
      for (let i = 0; i < _detailsOrders.length; i++) {
        const element = _detailsOrders[i];
        const article = articles.filter(
          (item) => item?.id == element?.article_id
        );
        _threeLastArticles.push({
          article_code: article[0]?.code,
          article_title: article[0]?.title,
          article_quantity: parseFloat(element?.dataValues?.total_quantity),
          article_amount: element?.dataValues?.total_amount,
        });
      }
      const threeLastArticles = _threeLastArticles
        .sort(function (a, b) {
          if (a.article_amount > b.article_amount) {
            return -1;
          }
        })
        .slice(0, 3);
      //
      const _groupedResult = await Order.findAll({
        attributes: [
          [fn("to_char", col("dates"), "YYYY"), "label"], // Format to "YYYY-MM"
          "status",
          [fn("SUM", col("total_quantity")), "total_quantity"], // Sum of amounts for that month
          [fn("SUM", col("pay_from_discount")), "total_amount"], // Sum of amounts for that month
        ],
        group: [fn("to_char", col("dates"), "YYYY"), "status"],
        order: [
          [fn("to_char", col("dates"), "YYYY"), "ASC"],
          ["status", "ASC"],
        ], // Order by month
      });

      const uniqueLabels = [
        ...new Set(_groupedResult.map((item) => item?.dataValues?.label)),
      ];
      //
      const transformedData = _groupedResult.reduce((acc, item) => {
        // Find if the category already exists in the accumulator
        let category = acc.find(
          (cat) => cat.label_categorie === item?.dataValues?.label
        );

        // If not, create a new category
        if (!category) {
          category = {
            label_categorie: item?.dataValues?.label,
            categorie_data: [],
          };
          acc.push(category);
        }

        // Check if the serie already exists
        let serie = category.categorie_data.find(
          (s) => s.label_serie === item?.dataValues?.status
        );

        // If not, create a new serie
        if (!serie) {
          serie = {
            label_serie: item?.dataValues?.status,
            serie_data: [],
          };
          category.categorie_data.push(serie);
        }

        // Push the total_amount to the serie_data
        serie.serie_data.push(item?.dataValues?.total_amount);

        return acc;
      }, []);

      return res.status(200).json({
        status: true,
        article: { count, rows },
        orders: {
          totalDelivered,
          totalApproved,
          totalPending,
          totalCanceled,
        },
        threeLastOrders,
        threeLastArticles,
        groupedResult: { categories: uniqueLabels, data: transformedData },
      });
    } catch (error) {
      console.log({ "catch error dashboard data processing ": error });
      return res.status(400).json({
        status: false,
        message: "CATCH ERROR DASHBOARD DATA PROCESSING.",
      });
    }
  },
};
