const SecHouse = document.getElementById("SecHouse");
const selectType = document.getElementById("selectType");
const selectStatus = document.getElementById("selectStatus");
const textFilter = document.getElementById("textFilter");
const btnFindProperties = document.getElementById("btnFindProperties");

let houses = [];

// funcion para formatear a pesos colombianos

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const renderhouses = (array) => {
  SecHouse.innerHTML = "";
  if (array.length != 0) {
    array.forEach((item) => {
      SecHouse.innerHTML += `<figure class="Card radius" id="${item.id}">
            <article class="img__card" style=" background-image: url(${
              item.url
            });
  background-size: cover">
              <div class="text_header_card">
                <p class="azul radius">${
                  item.category == "house" ? "HOUSE" : "APART"
                }</p>
                <p class="${item.status ? "naranja" : "red"} radius">${
        item.status ? "FOR SALE" : "SOLD"
      }</p>
              </div>
              <p class="p_bottomImg radius">${formatterPeso.format(
                item.price
              )}</p>
            </article>
            <figcaption class="Sec2_Card">
              <p class="p_figcaption">${item.place}</p>
              <h3 class="h3_figcaption">
                ${item.placeDescription}
              </h3>
              <article>
                <div class="infoArrendatario">
                  <div class="footerCardSec1">
                    <img src="img/User.png" alt="" />
                    <p>${item.nameArrenda}</p>
                  </div>
                  <p>${item.date}</p>
                </div>
                <div class="footerCardSec2">
                  <div class="flexIcons">
                    <img src="img/AreaIcon.svg" alt="" />
                    <p><span>${item.area}</span></p>
                  </div>

                  <div class="flexIcons">
                    <div class="flexIcons">
                      <img src="img/GarageIcon.svg" alt="" />
                      <p>${item.garage}</p>
                    </div>
                    <div class="flexIcons">
                      <img src="img/BathroomIcon.svg" alt="" />
                      <p>${item.bath}</p>
                    </div>
                    <div class="flexIcons">
                      <img src="img/BedroomIcon.svg" alt="" />
                      <p>${item.beedroom}</p>
                    </div>
                  </div>
                </div>
              </article>
            </figcaption>
          </figure>`;
    });
  } else {
    SecHouse.innerHTML += "<h2>Sin resultados</h2>";
  }
};

const getHouses = async () => {
  const response = await fetch("api.json");
  const data = response.json();
  return data;
};

const GetResponseHouses = async () => {
  houses = await getHouses();
  renderhouses(houses);
};
GetResponseHouses();

//Comeinzan los eventos

btnFindProperties.addEventListener("click", () => {
  let status = selectStatus.value == "1" ? true : false;

  let arrayfilter = houses.filter(
    (house) => house.category == selectType.value && house.status == status
  );
  renderhouses(arrayfilter);
});

textFilter.addEventListener("input", (e) => {
  let arrayfilter = houses.filter((house) =>
    house.place.toLowerCase().startsWith(e.target.value.toLowerCase())
  );
  renderhouses(arrayfilter);
});

SecHouse.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.localName == "article") {
    console.log("le di click a una imagen");
  }
});
