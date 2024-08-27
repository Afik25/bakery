import React from "react";
import "./dashboard.css";
import {
  FiBarChart2,
  FiShoppingBag,
  IoCubeOutline,
  IoCheckmarkCircleOutline,
  IoFilterSharp,
} from "../../../middlewares/icons";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="section-1">
        <div className="section-1-item">
          <div className="caption">
            <FiBarChart2 className="icon" />
            <span>Ventes</span>
          </div>
          <h2 className="title t-2">CDF 9500</h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <FiShoppingBag className="icon" />
            <span>Commandes</span>
          </div>
          <h2 className="title t-2">CDF 9500</h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <IoCubeOutline className="icon" />
            <span>Article</span>
          </div>
          <h2 className="title t-2">100</h2>
        </div>
        <div className="section-1-item">
          <div className="caption">
            <IoCheckmarkCircleOutline className="icon" />
            <span>Inscriptions</span>
          </div>
          <h2 className="title t-2">1000</h2>
        </div>
      </div>
      <div className="section-2">
        <div className="section-2-left">
          <h3 className="title t-3">Situation Générale</h3>
          <div className="s2l-item">
            <h2 className="title t-2">CDF 1.000.000</h2>
            <span>Totale Ventes</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2">CDF 1.000.000</h2>
            <span>Totale Commandes livrées</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2">CDF 1.000.000</h2>
            <span>Totale Commandes En attente</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2">CDF 1.000.000</h2>
            <span>Totale Commandes Approuvées</span>
          </div>
          <div className="s2l-item">
            <h2 className="title t-2">CDF 1.000.000</h2>
            <span>Totale Commandes Annulées</span>
          </div>
        </div>
        <div className="section-2-right">
          <div className="s2r-head">
            <h2 className="title t-2">Évolution des activités</h2>
            <div className="s2r-head-actions">
              <select>
                <option value={"vente"}>Ventes</option>
                <option value={"commande"}>Commandes</option>
              </select>
              <select>
                <option value={"year"}>Annuelle</option>
                <option value={"month"}>Mensuelle</option>
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
              series={[
                {
                  name: "Data 1",
                  data: [2, 4, 9, 7],
                },
                {
                  name: "Data 2",
                  data: [5, 3, 7, 10],
                },
              ]}
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
                  categories: ["Jan", "Fév", "Mars", "Avril"],
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
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="s3-item">
          <h3 className="title t-2">Articles le plus vendus</h3>
          <div className="s3-item-details">
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="s3-item">
          <h3 className="title t-2">Catégorie la plus sollicitée</h3>
          <div className="s3-item-details">
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
            <div className="s3id-row">
              <div className="s3id-row-left">
                <span>Thu 22 Aug 4:24 PM</span>
                <span>CMD-2024833071</span>
              </div>
              <div className="s3id-row-right">
                <span>8 articles</span>
                <span>CDF 1.000.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
