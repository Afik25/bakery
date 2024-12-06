import React, { useState, useEffect } from "react";
import "./dashboard.css";
import {
  FiBarChart2,
  FiShoppingBag,
  IoCubeOutline,
  IoCheckmarkCircleOutline,
  IoFilterSharp,
} from "../../../middlewares/icons";
import ReactApexChart from "react-apexcharts";
import { onGetDashboard } from "../../../services/order";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
//
import "moment/locale/fr";
import { capitalize, isEmpty, amountFormatter } from "../../../utils/utils";
moment.locale("fr");

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [parameters, setParameters] = useState({
    date: moment(Date.now()),
    timing: "YYYY",
  });
  const [chartData, setChartData] = useState({
    _labelsChart: [],
    _seriesData: [],
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetDashboard(axiosPrivate, signal, parameters).then((result) => {
      dispatch({
        type: "setUpOrder/getDashboard",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const dashboard = useSelector(
    (state) => state.setOrderSlice?.initDashboard?.dashboardData
  );

  useEffect(() => {
    const _labelsChart = dashboard?.data?.groupedResult?.categories;
    const _seriesData = [];

    for (let i = 0; i < dashboard?.data?.groupedResult?.data.length; i++) {
      const element = dashboard?.data?.groupedResult?.data[i];
      for (let j = 0; j < element?.categorie_data.length; j++) {
        const row = element?.categorie_data[j];
        _seriesData.push({
          name: row?.label_serie,
          data: row?.serie_data,
        });
      }
    }
    //
    setChartData({
      _labelsChart: _labelsChart,
      _seriesData: _seriesData,
    });
  }, []);

  const onFilter = () => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    onGetDashboard(axiosPrivate, signal, parameters).then((result) => {
      dispatch({
        type: "setUpOrder/getDashboard",
        payload: result,
      });
    });

    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  };

  return (
    <div className="dashboard">
      <div className="section-1">
        <div className="section-1-item">
          <div className="caption">
            <FiBarChart2 className="icon" />
            <span>Ventes</span>
          </div>
          <h2 className="title t-2">
            CDF {amountFormatter(dashboard?.data?.orders?.totalDelivered)}
          </h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <FiShoppingBag className="icon" />
            <span>Commandes</span>
          </div>
          <h2 className="title t-2">
            CDF {amountFormatter(dashboard?.data?.orders?.totalApproved)}
          </h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <IoCubeOutline className="icon" />
            <span>Article</span>
          </div>
          <h2 className="title t-2">{dashboard?.data?.article?.count}</h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <IoCheckmarkCircleOutline className="icon" />
            <span>Inscriptions</span>
          </div>
          <h2 className="title t-2">0</h2>
        </div>
      </div>
      <div className="section-2">
        <div className="section-2-left">
          <h3 className="title t-3">Situation Générale</h3>
          <div className="s2l-item">
            <h2 className="title t-2" style={{ color: "green" }}>
              CDF {amountFormatter(dashboard?.data?.orders?.totalDelivered)}
            </h2>
            <span>Totale Commandes livrées (ventes)</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2" style={{ color: "brown" }}>
              CDF {amountFormatter(dashboard?.data?.orders?.totalApproved)}
            </h2>
            <span>Totale Commandes Approuvées</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2" style={{ color: "grey" }}>
              CDF {amountFormatter(dashboard?.data?.orders?.totalPending)}
            </h2>
            <span>Totale Commandes En attente</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2" style={{ color: "red" }}>
              CDF {amountFormatter(dashboard?.data?.orders?.totalCanceled)}
            </h2>
            <span>Totale Commandes Annulées</span>
          </div>
        </div>
        <div className="section-2-right">
          <div className="s2r-head">
            <h2 className="title t-2">Évolution des activités</h2>
            <div className="s2r-head-actions">
              <select
                onChange={(e) =>
                  setParameters({
                    date: parameters?.date,
                    timing: e.target.value,
                  })
                }
              >
                <option value={"YYYY"}>Annuelle</option>
                <option value={"MM"}>Mensuelle</option>
                <option value={"last-month"}>Dernier Mois</option>
                <option value={"last-week"}>Dernier Semaine</option>
              </select>
              <button className="button">
                <IoFilterSharp className="icon" />
                <span>Voir</span>
              </button>
            </div>
          </div>
          <div className="s2r-body">
            <ReactApexChart
              series={chartData._seriesData}
              options={{
                colors: [
                  "#3572EF",
                  "#5DEBD7",
                  "#F2A51A",
                  "#C80036",
                  "#604CC3",
                  "#0C0C0C",
                ],
                title: {
                  text: "",
                  align: "left",
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                  },
                },
                chart: {
                  height: 350,
                  type: "area",
                  toolbar: {
                    show: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  categories: chartData._labelsChart,
                },
                yaxis: {
                  show: true,
                },
              }}
              type="area"
              height={"100%"}
            />
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="s3-item">
          <h3 className="title t-2">Dernières commandes</h3>
          <div className="s3-item-details">
            {isEmpty(dashboard?.data?.threeLastOrders) ? (
              <p>Aucune commande n'est encore disponible!</p>
            ) : (
              dashboard?.data?.threeLastOrders?.map((item, idx) => (
                <div className="s3id-row" key={idx}>
                  <div className="s3id-row-left">
                    <span>{moment(item?.dates).format("LLLL")}</span>
                    <span>{item?.code}</span>
                  </div>
                  <div className="s3id-row-right">
                    <span>{item?.total_quantity} articles</span>
                    <span>CDF {item?.pay_from_discount.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="s3-item">
          <h3 className="title t-2">Articles le plus vendus</h3>
          <div className="s3-item-details">
            {isEmpty(dashboard?.data?.threeLastArticles) ? (
              <p>Aucun article n'est encore vendu!</p>
            ) : (
              dashboard?.data?.threeLastArticles?.map((item, idx) => (
                <div className="s3id-row" key={idx}>
                  <div className="s3id-row-left">
                    <span>{capitalize(item?.article_title)}</span>
                    <span>{item?.article_code}</span>
                  </div>
                  <div className="s3id-row-right">
                    <span>{item?.article_quantity} articles</span>
                    <span>CDF {item?.article_amount?.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
