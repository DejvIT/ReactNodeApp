import React, { Component } from "react";
import AdminTable from './AdminTable'
import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      items: [
        {
          id: 1,
          name: "Minirypadlo KUBOTA U10/3 1120 kg",
          price: "1372",
          description:
            "- Motorizované kolečko muck-truck vybavené čtyřtaktním motorem Honda GXV 160 Vám pomůže přepravit až 250 kg náklad bez větší fyzické námahy a to i v místech, kam je obtížný přístup a kde nemůžete využít jinou mechanizaci. Muck-truckTM dokáže vyjet po schodech a bez problémů si poradí v kopci se stoupáním do 30° (ve skutečnosti i s prudším svahem). Nevyžaduje zpevněný terén",
          mth: "Den = 8 MTH",
          src: "/assets/images/bagr10.jpg",
          prices: {
            deposit: "10000",
            allPrices: [
              {
                letLength: "1 den",
                pricePerDay: "850",
              },
              {
                letLength: "1-4 hodiny (-40%)",
                pricePerDay: "510",
              },
              {
                letLength: "od 3 dnů",
                pricePerDay: "765",
              },
              {
                letLength: "od 7 dnů",
                pricePerDay: "723",
              },
              {
                letLength: "od 14 dnů",
                pricePerDay: "680",
              },
              {
                letLength: "od 30 dnů",
                pricePerDay: "850",
              },
            ],
          },
          parameters: {
            manufacturer: " Skoda",
            type: "MUCK-TRUCK",
            weight: "92kg",
            sizes: "155x75x85",
            fuel: "N95",
            engine: "čtyřtakt 5,5 HP",
            brakes: "kotoučová",
          },
        },
        {
          id: 2,
          name: "Mini Bagr BOBCAT E19 1768 kg",
          price: "1597",
          description: "- Motorizované kolečko muck-truck vybavené čtyřtaktním motorem Honda GXV 160 Vám pomůže přepravit až 250 kg náklad bez větší fyzické námahy a to i v místech, kam je obtížný přístup a kde nemůžete využít jinou mechanizaci. Muck-truckTM dokáže vyjet po schodech a bez problémů si poradí v kopci se stoupáním do 30° (ve skutečnosti i s prudším svahem). Nevyžaduje zpevněný terén",
          mth: "Den = 8 MTH",
          src: "/assets/images/bagr5.jpg",
          prices: {
            deposit: "10000",
            allPrices: [
              {
                letLength: "1 den",
                pricePerDay: "850",
              },
              {
                letLength: "1-4 hodiny (-40%)",
                pricePerDay: "510",
              },
              {
                letLength: "od 3 dnů",
                pricePerDay: "765",
              },
              {
                letLength: "od 7 dnů",
                pricePerDay: "723",
              },
              {
                letLength: "od 14 dnů",
                pricePerDay: "680",
              },
              {
                letLength: "od 30 dnů",
                pricePerDay: "850",
              },
            ],
          },
          parameters: {
            manufacturer: " Skoda",
            type: "MUCK-TRUCK",
            weight: "92kg",
            sizes: "155x75x85",
            fuel: "N95",
            engine: "čtyřtakt 5,5 HP",
            brakes: "kotoučová",
          },
        },
        {
          id: 3,
          name: "Minibagr KUBOTA KX018-4/1795kg",
          price: "1597",
          mth: "Den = 8 MTH",
          description:
          "- Motorizované kolečko muck-truck vybavené čtyřtaktním motorem Honda GXV 160 Vám pomůže přepravit až 250 kg náklad bez větší fyzické námahy a to i v místech, kam je obtížný přístup a kde nemůžete využít jinou mechanizaci. Muck-truckTM dokáže vyjet po schodech a bez problémů si poradí v kopci se stoupáním do 30° (ve skutečnosti i s prudším svahem). Nevyžaduje zpevněný terén",
          src: "/assets/images/bagr2.jpg",
          prices: {
            deposit: "10000",
            allPrices: [
              {
                letLength: "1 den",
                pricePerDay: "850",
              },
              {
                letLength: "1-4 hodiny (-40%)",
                pricePerDay: "510",
              },
              {
                letLength: "od 3 dnů",
                pricePerDay: "765",
              },
              {
                letLength: "od 7 dnů",
                pricePerDay: "723",
              },
              {
                letLength: "od 14 dnů",
                pricePerDay: "680",
              },
              {
                letLength: "od 30 dnů",
                pricePerDay: "850",
              },
            ],
          },
          parameters: {
            manufacturer: " Skoda",
            type: "MUCK-TRUCK",
            weight: "92kg",
            sizes: "155x75x85",
            fuel: "N95",
            engine: "čtyřtakt 5,5 HP",
            brakes: "kotoučová",
          },
        },
        {
          id: 4,
          name: "Kolečko stavební motorové 250kg",
          price: "617",
          mth: "",
          src: "/assets/images/bagr4.png",
          description:
          "- Motorizované kolečko muck-truck vybavené čtyřtaktním motorem Honda GXV 160 Vám pomůže přepravit až 250 kg náklad bez větší fyzické námahy a to i v místech, kam je obtížný přístup a kde nemůžete využít jinou mechanizaci. Muck-truckTM dokáže vyjet po schodech a bez problémů si poradí v kopci se stoupáním do 30° (ve skutečnosti i s prudším svahem). Nevyžaduje zpevněný terén",
          prices: {
            deposit: "10000",
            allPrices: [
              {
                letLength: "1 den",
                pricePerDay: "850",
              },
              {
                letLength: "1-4 hodiny (-40%)",
                pricePerDay: "510",
              },
              {
                letLength: "od 3 dnů",
                pricePerDay: "765",
              },
              {
                letLength: "od 7 dnů",
                pricePerDay: "723",
              },
              {
                letLength: "od 14 dnů",
                pricePerDay: "680",
              },
              {
                letLength: "od 30 dnů",
                pricePerDay: "850",
              },
            ],
          },
          parameters: {
            manufacturer: " Skoda",
            type: "MUCK-TRUCK",
            weight: "92kg",
            sizes: "155x75x85",
            fuel: "N95",
            engine: "čtyřtakt 5,5 HP",
            brakes: "kotoučová",
          },
        },
      ],
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <AdminTable items={ this.state.items }/>
        </header>
      </div>
    );
  }
}