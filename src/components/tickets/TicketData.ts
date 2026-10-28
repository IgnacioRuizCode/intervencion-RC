const ticketsData = [
  {
    id: 'early',
    title: 'Early Bird',
    price: '$25.000',
    originalPrice: '$35.000',
    badge: 'Quedan 38',
    subtitle: 'Presencial · precio especial hasta el 31/10',
    features: [
      'Acceso a las 10 charlas',
      'Kit de stickers Rolling Code',
      'Certificado de asistencia',
      'Coffee break y networking con los speakers',
      'Grabación de todas las charlas'
    ],
    isHighlighted: true,
    buttonText: 'Comprar entrada'
  },
  {
    id: 'general',
    title: 'General',
    price: '$35.000',
    badge: 'Desde el 1/11',
    subtitle: 'Presencial · precio regular',
    features: [
      'Acceso a las 10 charlas',
      'Certificado de asistencia',
      'Coffee break y networking con los speakers',
      'Grabación de todas las charlas'
    ],
    isHighlighted: false,
    buttonText: 'Comprar entrada'
  },
  {
    id: 'virtual',
    title: 'Virtual',
    price: '$15.000',
    badge: 'Desde donde estés',
    subtitle: 'Transmisión en vivo',
    features: [
      'Transmisión en vivo de las 10 charlas',
      'Chat para hacer preguntas a los speakers',
      'Certificado de asistencia',
      'Grabación disponible por 30 días'
    ],
    isHighlighted: false,
    buttonText: 'Comprar entrada'
  }
];

export default ticketsData