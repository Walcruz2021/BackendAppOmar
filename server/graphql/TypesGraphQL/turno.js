import gql from "graphql-tag";

const Turno = gql`
  """
  Client's Turns
  """
  type Turno {
    name: String
    nameDog: String
    idDog: String
    phone: Float
    date: String
    notesTurn: String
    time: String
    #   //(sellers)nombre de campo el cual contendra no solo el id del cliente sino ademas todos
    #   //los datos del mismo(pedidos,turnos,etc)
    Client: String
    Company: String
  }
`;
export default Turno;
