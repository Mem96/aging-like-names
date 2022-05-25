new Vue({
  el: "#main",
  data: {
    generalDescription:
      "In this website you can look up a name and predict the age of people who carries it.",
    errorMessage:
      "Sorry, this name couldn't be found! <br/>Try again with a different name or a different country.",

    searchedName: undefined,
    countrySelect: "",
    age: null,
    count: null,

    showResult: false,
    error: false,

    countryOptions: {
      IT: "Italy",
      ES: "Spain",
      GB: "United Kingdom",
      DE: "Germany",
      FR: "France",
    },
  },
  methods: {
    hideResult: function () {
      this.showResult = false;
      this.searchedName = undefined;
    },
    defineCountry: function (event) {
      if (event.target.value == "any") {
        this.countrySelect = "";
      } else {
        this.countrySelect = `&country_id=${event.target.value}`;
      }
    },
    searchName: function () {
      this.$refs.nameBar.blur();
      this.error = false;

      if (this.searchedName == undefined || this.searchedName == "") {
        return;
      } else {
        axios
          .get(
            `https://api.agify.io?name=${this.searchedName}${this.countrySelect}`
          )
          .then((result) => {
            if (result.data.count !== 0) {
              this.age = result.data.age;
              this.count = result.data.count;
              this.showResult = true;
            } else {
              this.error = true;
            }
          })
          .catch((error) => console.log(e.message));
      }
    },
  },
});
