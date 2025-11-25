import { Card } from "react-bootstrap";
import SurvivalBySex from "./charts/SurvivalBySex";
import AgeDistribution from "./charts/AgeDistribution";
import SurvivalByClass from "./charts/SurvivalByClass";
import AgeDistribution5yr from "./charts/AgeDistribution5yr";
import FareDistribution from "./charts/FareDistribution";
import SurvivedDistribution from "./charts/SurvivedDistribution";
import SexDistribution from "./charts/SexDistribution";
import ClassDistribution from "./charts/ClassDistribution";
import EmbarkedDistribution from "./charts/EmbarkedDistribution";
import SibSpDistribution from "./charts/SibSpDistribution";
import ParchDistribution from "./charts/ParchDistribution";
import SurvivalByEmbarked from "./charts/SurvivalByEmbarked";
import SurvivalClassSexHeatmap from "./charts/SurvivalClassSexHeatmap";
import SurvivalClassSex from "./charts/SurvivalClassSex";
import SurvivalByEmbarkedCount from "./charts/SurvivalByEmbarkedCount";
import SiblingsSpousesDistributionCount from "./charts/SiblingsSpousesDistributionCount";
import ParentsChildrenDistributionCount from "./charts/ParentsChildrenDistributionCount";
import SurvivalBySexCount from "./charts/SurvivalBySexCount";
import CorrelationAgeSexHeatMap from "./charts/CorrelationAgeSexHeatMap";
import CorrelationMatrix from "./charts/CorrelationMatrix";



export default function MetricCard({ title, chartId }) {
  const renderChart = () => {
    switch (chartId) {
      case "survivalBySex":
        return <SurvivalBySex />;
      case "survivalByClass":
        return <SurvivalByClass />;
      case "ageDist":
        return <AgeDistribution />;
      case "heatmap":
        return <CorrelationHeatmap />;
      case "ageDist5yr":
        return <AgeDistribution5yr />;
      case "fareDist":
        return <FareDistribution />;
      case "survivedDist":
        return <SurvivedDistribution />;
      case "sexDist":
        return <SexDistribution />;
      case "classDist":
        return <ClassDistribution />;
      case "embarkedDist":
        return <EmbarkedDistribution />;
      case "sibspDist":
        return <SibSpDistribution />;
      case "parchDist":
        return <ParchDistribution />;
      case "survivalByEmbarked":
        return <SurvivalByEmbarked />;
      case "survivalClassSexHeatmap":
        return <SurvivalClassSexHeatmap />;
      case "survivalClassSex":
        return <SurvivalClassSex />;
      case "survivalByEmbarkedCount":
        return <SurvivalByEmbarkedCount />;
      case "siblingsSpousesCount":
        return <SiblingsSpousesDistributionCount />;
      case "parentsChildrenCount":
        return <ParentsChildrenDistributionCount />;
      case "survivalBySexCount":
        return <SurvivalBySexCount />;
      case "correlationAgeSexHeatmap":
        return <CorrelationAgeSexHeatMap />;
      case "correlationMatrix":
        return <CorrelationMatrix />;



      default:
        return <p className="text-muted">Gráfico no encontrado</p>;
    }
  };



  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="mt-3">{renderChart()}</div>
      </Card.Body>
    </Card>
  );
}