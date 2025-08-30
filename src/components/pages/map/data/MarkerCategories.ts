import { IconType } from 'react-icons';
import {
    FaBiking,
    FaBuilding,
    FaBus,
    FaCamera,
    FaHome,
    FaRestroom,
    FaSchool
} from 'react-icons/fa';
import {
    MdFitnessCenter,
    MdGroups,
    MdPayment,
    MdStore
} from 'react-icons/md';

export interface MarkerCategory {
  title: string;
  icon: IconType;
  iconName: string;
  haveEvent: boolean;
  color: string;
  border: string;
  id: string;
}

const MarkersCategories: MarkerCategory[] = [
  {
    title: '行政處室',
    icon: FaBuilding,
    iconName: 'building',
    haveEvent: true,
    color: '#10B981',
    border: '#047857',
    id: '行政處室'
  },
  {
    title: '系館',
    icon: FaSchool,
    iconName: 'school',
    haveEvent: false,
    color: '#0077E6',
    border: '#004282',
    id: '系館'
  },
  {
    title: '體育場所',
    icon: MdFitnessCenter,
    iconName: 'weight-lifter',
    haveEvent: false,
    color: '#EF4444',
    border: '#B91C1C',
    id: '體育場所'
  },
  {
    title: '自動繳費機',
    icon: MdPayment,
    iconName: 'payment',
    haveEvent: false,
    color: '#EAB308',
    border: '#A16207',
    id: '自動繳費機'
  },
  {
    title: '社團活動區',
    icon: MdGroups,
    iconName: 'md-people-circle',
    haveEvent: false,
    color: '#F43F5E',
    border: '#BE123C',
    id: '社團活動區'
  },
  {
    title: '宿舍',
    icon: FaHome,
    iconName: 'house',
    haveEvent: false,
    color: '#84CC16',
    border: '#4D7C0F',
    id: '宿舍'
  },
  {
    title: '景點',
    icon: FaCamera,
    iconName: 'camera-retro',
    haveEvent: false,
    color: '#06B6D4',
    border: '#0E7490',
    id: '景點'
  },
  {
    title: '公廁',
    icon: FaRestroom,
    iconName: 'wc',
    haveEvent: false,
    color: '#F59E0B',
    border: '#B45309',
    id: '公廁'
  },
  {
    title: '公車站',
    icon: FaBus,
    iconName: 'bus-stop',
    haveEvent: false,
    color: '#0EA5E9',
    border: '#0369A1',
    id: '公車站'
  },
  {
    title: '校內店家',
    icon: MdStore,
    iconName: 'isv',
    haveEvent: false,
    color: '#6366F1',
    border: '#4338CA',
    id: '校內店家'
  },
  {
    title: 'Ubike',
    icon: FaBiking,
    iconName: 'bike',
    haveEvent: false,
    color: '#F97316',
    border: '#C2410C',
    id: 'Ubike'
  },
];
//   {
//     title: '校外店家',
//     icon: MdRestaurant,
//     iconName: 'food-fork-drink',
//     haveEvent: false,
//     color: '#A855F7',
//     border: '#7E22CE',
//     id: '校外店家'
//   },
export default MarkersCategories;
