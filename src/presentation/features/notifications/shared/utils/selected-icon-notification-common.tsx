import { SVGIcon } from "../../../../components/ui/icons";
import AgroIcon from "./../../../../../../public/assets/img/icons/agro.svg?react";
import Alerta1 from "./../../../../../../public/assets/img/icons/alerta1.svg?react";
import Alerta2 from "./../../../../../../public/assets/img/icons/alerta2.svg?react";
import Apps from "./../../../../../../public/assets/img/icons/apps.svg?react";
import AprendizajeComercial from "./../../../../../../public/assets/img/icons/aprendizaje_comercial.svg?react";
import CaidaSistema from "./../../../../../../public/assets/img/icons/caida_sistema.svg?react";
import CapacitacionInstructivo from "./../../../../../../public/assets/img/icons/capacitacion_instructivo.svg?react";
import ChatBot from "./../../../../../../public/assets/img/icons/chatbot.svg?react";
import Cobranzas from "./../../../../../../public/assets/img/icons/cobranzas.svg?react";
import Descarga from "./../../../../../../public/assets/img/icons/descarga.svg?react";
import Encuesta from "./../../../../../../public/assets/img/icons/encuesta.svg?react";
import Facturacion from "./../../../../../../public/assets/img/icons/facturacion.svg?react";
import Incentivos from "./../../../../../../public/assets/img/icons/incentivos.svg?react"; 
import Industria from "./../../../../../../public/assets/img/icons/industria.svg?react"; 
import Link from "./../../../../../../public/assets/img/icons/link.svg?react"; 
import Logistica from "./../../../../../../public/assets/img/icons/logistica.svg?react"; 
import MantenimientoProgramado from "./../../../../../../public/assets/img/icons/mantenimiento_programado.svg?react"; 
import MedioPago from "./../../../../../../public/assets/img/icons/medio_pago.svg?react"; 
import OperacionTelefonica from "./../../../../../../public/assets/img/icons/operacion_telefonica.svg?react"; 
import Pac from "./../../../../../../public/assets/img/icons/pac.svg?react"; 
import Pedidos from "./../../../../../../public/assets/img/icons/pedidos.svg?react"; 
import Reporte1 from "./../../../../../../public/assets/img/icons/reporte1.svg?react"; 
import Reporte2 from "./../../../../../../public/assets/img/icons/reporte2.svg?react"; 
import Satifaccion from "./../../../../../../public/assets/img/icons/satifaccion.svg?react"; 
import UsuarioContrana from "./../../../../../../public/assets/img/icons/user_pass.svg?react"; 
import YPFRuta from "./../../../../../../public/assets/img/icons/ypf_ruta.svg?react"; 

export function selectedIconsNotificationCommon(id: string): React.ReactNode{
    
 switch (Number(id)) {
    case 1:  return <SVGIcon icon={ AgroIcon } />; //"Agro";
    case 2:  return <SVGIcon icon={Alerta1} />; //"Alerta 1";
    case 3:  return <SVGIcon icon={Alerta2}/>; //"Alerta 2";
    case 4:  return <SVGIcon icon={Apps} />; //"Apps";
    case 5:  return <SVGIcon icon={AprendizajeComercial} />; //"Aprendizaje Comercial";
    case 6:  return <SVGIcon icon={CaidaSistema} />; //"Caída de sistema";
    case 7:  return <SVGIcon icon={CapacitacionInstructivo} />; //"Capacitación/instructivo";
    case 8:  return <SVGIcon icon={ChatBot} />; //"Chatbot";
    case 9:  return <SVGIcon icon={Cobranzas} />; //"Cobranzas";
    case 10: return <SVGIcon icon={Descarga} />; //"Descarga";
    case 11: return <SVGIcon icon={Encuesta} />; //"Encuesta";
    case 12: return <SVGIcon icon={Facturacion} />; //"Facturación";
    case 13: return <SVGIcon icon={Incentivos} />; //"Incentivos";
    case 14: return <SVGIcon icon={Industria} />; //"Industria";
    case 15: return <SVGIcon icon={Link} />; //"Link";
    case 16: return <SVGIcon icon={Logistica} />; //"Logistica";
    case 17: return <SVGIcon icon={MantenimientoProgramado} />; //"Mantenimiento programado/evento";
    case 18: return <SVGIcon icon={MedioPago} />; //"Medios de pago";
    case 19: return <SVGIcon icon={OperacionTelefonica} />; //"Operación telefónica";
    case 20: return <SVGIcon icon={Pac} />; //"PAC";
    case 21: return <SVGIcon icon={Pedidos} />; //"Pedidos";
    case 22: return <SVGIcon icon={Reporte1} />; //"Reportes 1";
    case 23: return <SVGIcon icon={Reporte2} />; //"Reportes 2";
    case 24: return <SVGIcon icon={Satifaccion} />; //"Satisfacción";
    case 25: return <SVGIcon icon={UsuarioContrana} />; //"Usuario/contraseña";
    case 26: return <SVGIcon icon={YPFRuta} />; //"YPF Ruta";
    default: return <SVGIcon icon={Link} />; //"Desconocido";
  }

}