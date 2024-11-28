import gql from "graphql-tag";

const Company = gql`
  type Company {
    id: ID
    nameCompany: String
    address: String
    cuit: String
    province: String
    country: String
    emailUser:String
  }
`;

export default Company;
