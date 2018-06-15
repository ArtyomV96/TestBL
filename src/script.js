var data = [
    {
        id: 1,
        surname: "Твардовский",
        name: "Максим",
        patronymic: "Витальевич",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 4, 20),
        team: "FailCrew",
        regDate: new Date(2018, 6, 9),
        city: "Санкт-Петербург"
    },
    {
        id: 2,
        surname: "Bluss",
        name: "Kristaps",
        patronymic: "",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1981, 3, 20),
        team: "HGK",
        regDate: new Date(2018, 6, 9),
        city: "Рига"
    },
    {
        id: 3,
        surname: "Tuerck",
        name: "Ryan",
        patronymic: "",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 2, 20),
        team: "Race Service",
        regDate: new Date(2018, 6, 9),
        city: "Оберн, Нью-Гэмпшир"
    },
    {
        id: 4,
        surname: "Цареградцев",
        name: "Аркадий",
        patronymic: "Петрович",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 6, 20),
        team: "FailCrew",
        regDate: new Date(2018, 6, 9),
        city: "Красноярск"
    },
    {
        id: 5,
        surname: "Седых",
        name: "Екатерина",
        patronymic: "Сергеевна",
        sex: "Женский",
        number: +79990275352,
        bornDate: new Date(1985, 4, 20),
        team: "Team Yokohama",
        regDate: new Date(2018, 6, 9),
        city: "Владивосток"
    },
    {
        id: 6,
        surname: "Кабаргин",
        name: "Сергей",
        patronymic: "Леонидович",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 3, 20),
        team: "EvilEmpire",
        regDate: new Date(2018, 6, 9),
        city: "Санкт-Петербург"
    },
    {
        id: 7,
        surname: "Чивчян",
        name: "Георгий",
        patronymic: "Тумасович",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 2, 20),
        team: "Форвард Авто",
        regDate: new Date(2018, 6, 9),
        city: "Красноярск"
    },
    {
        id: 8,
        surname: "Найт",
        name: "Мария",
        patronymic: "Константиновна",
        sex: "Женский",
        number: +79990275352,
        bornDate: new Date(1985, 5, 20),
        team: "EvilEmpire",
        regDate: new Date(2018, 6, 9),
        city: "Санкт-Петербург"
    },
    {
        id: 9,
        surname: "Лосев",
        name: "Евгений",
        patronymic: "Игоревич",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 3, 20),
        team: "Автопрофи",
        regDate: new Date(2018, 6, 9),
        city: "Иркутск"
    },
    {
        id: 10,
        surname: "Saito",
        name: "Daigo",
        patronymic: "",
        sex: "Мужской",
        number: +79990275352,
        bornDate: new Date(1985, 7, 20),
        team: "Monster Energy",
        regDate: new Date(2018, 6, 9),
        city: "Сайтама"
    }
];
var testStore;
var selectedItemNumber;

function initGrid(grid) {
    require([
        "dojox/grid/DataGrid",
        "dojox/grid/cells",
        "dojox/grid/cells/dijit",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/date/locale",
        "dojo/currency",
        "dijit/form/DateTextBox",
        "dijit/form/CurrencyTextBox",
        "dijit/form/HorizontalSlider",
        "dojo/data/ItemFileWriteStore",
        "dojo/domReady!"
    ], function(DataGrid, cells, cellsDijit, Memory, ObjectStore, locale, currency,
                DateTextBox, gridLayout){
        var grid;

        function formatDate(inDatum){
            return locale.format(new Date(inDatum), this.constraint);
        }
        gridLayout = [{
            defaultCell: { width: 8, editable: false, type: cells._Widget, styles: 'text-align: right;'  },
            cells: [
                { name: 'Id', field: 'id', width: 4 },
                { name: 'Фамилия', field: 'surname', styles: '', width: 9},
                { name: 'Имя', field: 'name', styles: '', width: 9 },
                { name: 'Отчество', field: 'patronymic', styles: '', width: 9 },
                { name: 'Номер', field: 'number', styles: '' },
                { name: 'Команда', field: 'team', styles: '', width: 9 },
                { name: 'Дата регистрации', field: 'regDate',
                    widgetClass: DateTextBox,
                    formatter: formatDate,
                    constraint: {formatLength: 'long', selector: "date"}}
            ]
        }];

        var objectStore = new Memory({data:data});

        // global var "test_store"
        testStore = new ObjectStore({objectStore: objectStore});

        //	create the grid.
        grid = new DataGrid({
            store: testStore,
            structure: gridLayout,
            escapeHTMLInData: false,
            "class": "grid"
        }, "grid");

        grid.on("RowClick", function(evt){
            var idx = evt.rowIndex,
                rowData = grid.getItem(idx);
            selectedItemNumber = idx;
            document.getElementById("name").innerHTML =
                "Имя:";
            document.getElementById("nameText").innerHTML =
                rowData.name;
            if (rowData.patronymic === "") {
                document.getElementById("patronymic").innerHTML =
                    "";
                document.getElementById("patronymicText").innerHTML =
                    "";
            } else {
                document.getElementById("patronymic").innerHTML =
                    "Отчество:";
                document.getElementById("patronymicText").innerHTML =
                    rowData.patronymic;
            }
            document.getElementById("surname").innerHTML =
                "Фамилия:";
            document.getElementById("surnameText").innerHTML =
                rowData.surname;
            document.getElementById("sex").innerHTML =
                "Пол:";
            document.getElementById("sexText").innerHTML =
                rowData.sex;
            document.getElementById("number").innerHTML =
                "Номер:";
            document.getElementById("numberText").innerHTML =
                rowData.number;
            document.getElementById("team").innerHTML =
                "Команда:";
            document.getElementById("teamText").innerHTML =
                rowData.team;
            document.getElementById("city").innerHTML =
                "Город:";
            document.getElementById("cityText").innerHTML =
                rowData.city;
            document.getElementById("bornDate").innerHTML =
                "Дата рождения:";
            var month = rowData.bornDate.getMonth() + 1;
            document.getElementById("bornDateText").innerHTML =
                rowData.bornDate.getDate() + "." + month + "." + rowData.bornDate.getFullYear() ;
            document.getElementById("regDate").innerHTML =
                "Дата регистрации:";
            document.getElementById("regDateText").innerHTML =
                rowData.regDate.getDate() + "." + rowData.regDate.getMonth() + "." + rowData.regDate.getFullYear();
        }, true);
        
        grid.startup();

    });
}

function remItem(){
    var item = data[selectedItemNumber];
    testStore.deleteItem(item);
    testStore.save();
}

function addItem() {
    var bDate = document.getElementById("bornA").value.split('.');
    var rDate = document.getElementById("regA").value.split('.');
    var elem = {
        id: data[data.length - 1].id + 1,
        surname: document.getElementById("surnameA").value,
        name: document.getElementById("nameA").value,
        patronymic: document.getElementById("patronymiсA").value,
        sex: document.getElementById("sexA").value,
        number: document.getElementById("numberA").value,
        bornDate: new Date(bDate[2], bDate[1] - 1, bDate[0]),
        team: document.getElementById("teamA").value,
        regDate: new Date(rDate[2], rDate[1], rDate[0]),
        city: document.getElementById("cityA").value
    };

    testStore.newItem(elem);
    testStore.save();
}

function editDialogCreate() {
    var selElem = data[selectedItemNumber];
    document.getElementById("surnameE").value = selElem.surname;
    document.getElementById("nameE").value = selElem.name;
    document.getElementById("patronymicE").value = selElem.patronymic;
    document.getElementById("numberE").value = selElem.number;
    document.getElementById("teamE").value = selElem.team;
    document.getElementById("cityE").value = selElem.city;
    document.getElementById("sexE").value = selElem.sex;
    document.getElementById("bornE").value = selElem.bornDate.getDate() + '.' + (selElem.bornDate.getMonth()+1) + '.' + selElem.bornDate.getFullYear();
    document.getElementById("regE").value = selElem.regDate.getDate() + '.' + selElem.regDate.getMonth() + '.' + selElem.regDate.getFullYear();

}

function editItem() {
    var selElem = data[selectedItemNumber];
    var bDate = document.getElementById("bornE").value.split('.');
    var rDate = document.getElementById("regE").value.split('.');
    selElem.surname = document.getElementById("surnameE").value;
    selElem.name = document.getElementById("nameE").value;
    selElem.patronymic = document.getElementById("patronymicE").value;
    selElem.number = document.getElementById("numberE").value;
    selElem.team = document.getElementById("teamE").value;
    selElem.sex = document.getElementById("sexE").value;
    selElem.city = document.getElementById("cityE").value;
    selElem.bornDate = new Date(bDate[2], bDate[1] - 1, bDate[0]);
    selElem.regDate = new Date(rDate[2], rDate[1], rDate[0]);
    testStore.setValue(selElem);
    testStore.save();
}