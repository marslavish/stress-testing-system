import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'StressTestingSystem',
  menu: {
    locale: false,
  },
  pwa: false,
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAErklEQVRYhe2YO2wcRRjHfzO7c3vns322g50YOwYnUQI0BIREA1WEQoUEQpEoKCLxkOgoUJAIDaJCiIKGAhFCgQQIiQYJCjpEgxQQQiAISUgcx/iCH3D2+e52d2bQzJ3tezmKiTi74Cv2dmf3m/9/vufMCc7NPk+UOwYYrLH0VgKgCrwEFJuRQ5L4cYw+TrYPpARjeszNy8PAtL8TAoxGIuUcWsPaqkVriwx2gtidwJfNA7J+lWCtoFKGNDEEQZ15b+U48MU6YrhJsUGuugYmsqgMaC2wPQ27RxHiK4w+EbYM160kqFbwbh0suCfobUocA/th2PWVJ2MEAwOgAN1TYg7/cHdiNKynDQiXqT2l5WRZ9hzyJuV/YtuVrWNsK7F8TsgVMoiNbHXJkmKJGUTwdIem5SMyLBK26cRYUsYRPNGusn1iimfDKvOFIhhZBwhSKA1CnPcEHwMKTaRiFE9FKzCwAjqslx9hoVSANCKLpnJrxAQJgsrkDGLvPKdr2bq+Slhc7eft8/eAVvxB2kRMcTGM4eAF6FvjxTRkCIuIalyeH+fMlSO+HK0AA/+eWMBVtcbf+TIT5X5e0422GmcgTDkb1ijpiF+BuzZ0JNfCKgSafDnPW+vDqaKUq3AmqFL1i9GtxLYX/IJioL0bRmxTK3X30jAR1fyMf7boWIpWerePi6YOYiSpNKgg8TqX2qG2m5VFR8KKJldtEritcdcaLwEL2SqolMm2xYyohH2NxczfGrGAYlT1MTVk2jQF7AvqrWu1TeuSSkAYDneZcV/j93o3YuPboHbegWAZ7ZjIcsRZBstyywvNxVzFJ+L+dh1hmQhTfzvXSSyTfuJmxd7E/ssy601PJzEtmXbWJOWvDT9I/3zN6eiAsQ5ww1QUe3Nf7XgnrhfeBx4kSko33N44kIRrDtxIbu/gLBj1rjTMtL1aavwOd1nMQVXzVr1Cm11kMDd0XzCz51visEA2+eEG1Byoz0rERqA3y5iPO9lCrIZgseGMqS6LGVOxJ1bqsIPNxW+KcvRLcGHvqFjOHyWbvFN3bQfwCoKZBsihDs6SyUwMQcJlJPXIkZTCmLIDN7Jx2GiVSVvvHkvtuz43PGOj5IirN/LqnodEcfAFlHkGZVrjTiJVQpypg3QEspFMZGJyUYUKQaNwS0adq1RCv5GdMWYC9vrFxD4um09B0/XO5QgoI9D262Bu+ElTDt4zd6x+T79+GREKDIKIH12FUgnDadgJ4qYIUw4Emp/o4w0Eh8jxe7jgx6fSLj3GSKZUQmSdy/O8S+zj0Fnjwubntp7zNpt8ynL/66GNXs1nxQlnUn8ekVBY8gTckaVrK0tD+kYW/Sn2lN/1Op1FP57t9r0VRMKSmZylVirzXLMzuwKYvvS0qqqjU78FH2QCjLZ+uyJMgIkz3Cu2yN5EcXKwxP7hJaTXMAitMIni+A10Tg0t893IAqKRme66LIKPy2eAk80fa2vJSMn0UA4l3XP3Sf9DKe7WHeyc7Fb4doH4kvjzLiTm69gr4Pfc7buCHZX1GPsMuHs3Wa85+GeB+4FzO8hnQ9qz0vX6B4CzO8jJyYGtDiOurn0DPLL+F0sPSQng4j/gPabSg7Jh3gAAAABJRU5ErkJggg==',
  iconfontUrl: '',
};

export default Settings;