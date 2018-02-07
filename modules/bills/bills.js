/*jshint esversion : 6*/
/** @module bills */
var bills = (function bills() {
    "use strict";

    var
    activeUser,
    activeUserId,
    activeBillId,
    formBill,
    formBillBtn,
    formStatus,
    idsBills = [],
    inputTotal,
    inputDate,
    tablerBills,
    select_all;


    /** @function addBillInDOMList
     * Ajoute une ligne dans le tableur HTML affichant les factures
     *
     * @param {number} insertedId - id de le facture insérée en bdd
     * @param {object} billData - date et montant de la facture insérée en bdd
     * @returns {object} la nouvelle ligne de facture en tant qu'objet html (tr)
     */
    function addBillInDOMList(insertedId, billData) {

        var td;
        const tr = document.createElement('tr');
        tr.setAttribute("data-id-bill", insertedId);
        tr.setAttribute("data-id-user", activeUserId);
        tr.classList.add("bill");

        td = document.createElement('td');
        td.textContent = insertedId;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = activeUserId;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = billData.total;
        tr.appendChild(td);
        td = document.createElement('td');
        td.textContent = billData.createdAt;
        tr.appendChild(td);
        td = document.createElement('td');
        td.className = "update";
        td.innerHTML = "<span class=\"tabler-btn\">edit</span>";
        td.querySelector(".tabler-btn").onclick = paramEditForm;
        tr.appendChild(td);
        td = document.createElement('td');
        td.className = "delete";
        td.innerHTML= "<input type=\"checkbox\">";
        tr.appendChild(td);


        if (!tablerBills) {
            tablerBills = createTablerHTML();
        }

            activeUserId = null;
            return tablerBills.appendChild(tr);

        }


    /** @function createBill
     * Envoie un appel ajax pour créer une nouvelle facture en base de données
     *
     * @async
     * @param {object} evt - l'objet événemment (click)
     * @returns {undefined} RAS
     */
    function createBill(evt, mode) {
        const createdAt = inputDate.value;
        const total = Number(inputTotal.value);

        if (createdAt && total) {
            evt.preventDefault();
            const fd = new FormData();
            const xhr = new XMLHttpRequest();

            if (mode === "update") {
                fd.append("id_bill", activeBillId )
            }
            fd.append('id_user', activeUserId);
            fd.append('created_at', createdAt);
            fd.append('total', total);
            fd.append('action', "create_bill");

            xhr.open('POST', "ajax.php");
            xhr.onload = function getServerResponse(){
                if (mode === "create") {
                    let id= Number(this.response)
                    addBillInDOMList(id, {createdAt: createdAt, total:total});
                }else {
                    updateBillInDOMList(createdAt, total);
                }

                displayEmptyMessage("off");
                resetForm();
            }
            xhr.send(fd);
        }
    }


    /** @function createTablerHTML
     * Crée un widget tableur en html pour afficher les données stockées en base
     *
     * @returns {object} le corps du tableur (tbody)
     */
    function createTablerHTML() {

        const tablerHead = [
            "id",
            "id_user",
            "total",
            "created_at",
            "update"
        ];
        var markup = "";
        let tabler = document.createElement("table");
        tabler.id = "tabler_bills";
        tabler.className = "tabler bills";

        markup += "<thead><tr>";

        for (let i = 0; i < tablerHead.length; i += 1) {
            markup += `<th>${ tablerHead[i] }</th>`;
        }

        markup += `<th class=\"delete\">
            <input type=\"submit\" id=\"delete_bills\" value=\"delete\" class=\"tabler-btn\">
        </th>`;

        markup+= `<th class=\"delete\">
            <input type=\"submit\" id=\"delete_bills\" value=\"delete\" class=\"tabler-btn\">
        </th>`;

        markup += "</tr></thead><tbody id=\"tabler_bills_body\"></tbody>";

        tabler.innerHTML = markup;
        tabler.querySelector(".tabler-btn").onclick = deleteBills;
        tabler = document.getElementById("bills_wrap").appendChild(tabler);
        return tabler.querySelector("tbody");

    }


    /** @function deleteBills
     * Vérifie dans le DOM le nombre de factures à supprimer et lance un appel AJAX
     * @async
     * @returns {undefined} RAS
     */
    function deleteBills() {

        const checked = tablerBills.querySelectorAll(".bills input:checked");

        if (checked.length) {
            let fd = new FormData();
            let xhr = new XMLHttpRequest();

            checked.forEach(function(c){
                let bill = c.parentElement.parentElement;
                let idBill = Number(bill.getAttribute("data-id-bill"));
                idsBills.push(idBill)
            });

            fd.append("action", "delete_bills");
            fd.append("ids", JSON.stringify(idsBills));

            xhr.open("POST", "ajax.php");
            xhr.onload = function getServerResponse(){
                const billsLeft = removeBillsFromDOMList();
                if (billsLeft === 0) {
                    displayEmptyMessage("on");
                    displayTabler('off');

                }
            };

            xhr.send(fd);
        }
    }




    /** @function displayEmptyMessage
     * Widget d'affichage du tableur. Un message indique à l'utilisteur si aucune facture n'est disponible
     *
     * @param {string} mode - si vaut "off", masque le widget, sinon affiche si vaut "on"
     * @returns {undefined} RAS
     */
    function displayEmptyMessage(mode) {

        const msgBox = document.getElementById('msg_empty_bills');
        if (!msgBox) return;
        if (mode === "off") {
            msgBox.classList.add('is-hidden');
        }else if (mode === "on") {
            msgBox.classList.remove('is-hidden');
        }

    }


    /** @function displayTabler
     * Affiche ou masque le tableur contenant les factures
     *
     * @param {string} mode - masque le widget si vaut "off", sinon si "on", affiche le widget
     * @returns {undefined} RAS
     */
    function displayTabler(mode) {

    }


    /**
     * lance les écouteurs d'évènements (event listeners) pour tout le module bills
     * @returns {undefined} RAS
     */
    function observer() {
        tablerBills = document.getElementById('tabler_bills_body');
        formBill = document.getElementById('form_bill');
        formBillBtn = document.getElementById('btn_form_bill');
        inputTotal = document.getElementById('total');
        inputDate = document.getElementById("created_at");
        select_all = document.getElementById('select_all');

      const tablerUsers = document.getElementById("users");
      const deleteBtn = document.getElementById("delete_bills");
      const cancelBtn = document.getElementById("cancel_bill");

      if(formBillBtn) formBillBtn.onclick = function chooseFormMode(evt){
         createBill(evt, formStatus);

      }
      if (deleteBtn) deleteBtn.onclick = deleteBills;
      if (cancelBtn) cancelBtn.onclick = resetForm;

      // select_all.onclick = selectAll;

      function selectAll(){
          const select = document.querySelectorAll(".bill input");

          for (var i = 0; i < select.length; i++) {

              if (  select[i].checked === true ) {
                 select[i].checked = false;
             }else{
               select[i].checked = true;
           }
          }

          console.log(select);
      }

      if(tablerBills) {
           const updateBillBtns = tablerBills.querySelectorAll(".bill .tabler-btn");

           updateBillBtns.forEach(function observe(btn){
               btn.onclick = paramEditForm;
           });

       }
      if (tablerUsers) {
          const createBillBtns = tablerUsers.querySelectorAll('.bill .tabler-btn');
          createBillBtns.forEach(function observer(btn){
              btn.onclick = paramCreateForm;
          });
        }

    }


    /** @function openForm
     * Ouvre le formulaire de création/édition de facture.
     * Pour une édition, remplit le form avec les infos correpondant à l'id de facture.
     *
     * @param {undefined|object} billToEdit - undefined pour une création. pour une édition : date et montant de la facture
     * @returns {undefined} RAS
     */
    function openForm(billToEdit) {

        if(formBill.classList.contains('is-active')){
            resetForm();
            openForm(billToEdit);
        } else{
            let title = formBill.querySelector('.title .ursername');
            formBill.classList.add('is-active');
            title.textContent = `Facture pour ${activeUser.name} ${activeUser.lastname}`;

            if(billToEdit){
                formStatus = "update";
                formBillBtn.value = "Editer facture";
                let dateC = formBill.querySelector("#created_at");
                let total = formBill.querySelector("#total");

                total.value = billToEdit.total;
                dateC.value = billToEdit.created_at;
            }else {
                formStatus = "create";
                formBillBtn.value = "Ajouter facture";
            }
        }

    }


    /** @function paramCreateForm
     * Ouvre le formulaire de facturation en mode création.
     *
     * @async
     * @param {object} evt - l'objet événemment (click)
     * @returns {undefined} RAS
     */
    function paramCreateForm(evt) {
        const src = evt.target || evt.srcElement;
        const parent = src.parentElement.parentElement;
        const fd = new FormData();
        const xhr = new XMLHttpRequest();

        evt.preventDefault();

        activeUserId = Number(parent.getAttribute('data-id-user'));

        fd.append('id', activeUserId);
        fd.append('action', 'get_user');

        xhr.open('POST', "ajax.php");
        xhr.onload = function getUserFromServer(){
            console.log(this.response);
            activeUser = JSON.parse(this.response);
            console.log(activeUser);
            openForm();
        };

        xhr.send(fd);


    }


    /** @function paramEditForm
     * Ouvre le formulaire de facturation en mode edition.
     * Remplit le formulaire avec les infos correpondant à l'id de facture.
     *
     * @async
     * @param {object} evt - l'objet événemment (click)
     * @returns {undefined} RAS
     */
    function paramEditForm(evt) {
        const src = evt.target || evt.srcElement;
        const parent = src.parentElement.parentElement;
        const fd = new FormData();
        const xhr = new XMLHttpRequest();

        evt.preventDefault();

        activeUserId = Number(parent.getAttribute("data-id-user"));
        activeBillId = Number(parent.getAttribute("data-id-bill"));

        fd.append("id_bill", Number(parent.getAttribute("data-id-bill")));
        fd.append("action", "get_bill");

        xhr.open("POST", "ajax.php");

        xhr.onload = function getBillFromServer() {
            const billToEdit = JSON.parse(this.response);
            activeUser = billToEdit.user;
            openForm(billToEdit);
        };
    xhr.send(fd);

    }


    /** @function removeBillsFromDOMList
     * Supprime les lignes du tableur contenant des checkbox cochés
     *
     * @returns {number} la tailles de lignes du tableur restantes
     */
    function removeBillsFromDOMList() {

        const checkboxes = tablerBills.querySelectorAll(".bill input:checked");
        checkboxes.forEach(function parse(checkbox){
            checkbox.parentElement.parentElement.remove();
        });
        return tablerBills.querySelectorAll("tbody tr").length;

    }


    /** @function resetForm
     * Réinitialise les champs du formulaire
     *
     * @returns {undefined} RAS
     */
    function resetForm() {
        inputDate.value = "";
        inputTotal.vallue = "";
        formBill.classList.remove('is-active');
    }

    function updateBillInDOMList(createdAt, total) {
        var td;
        // on recupere la ligne contenant la facture mise a Ajouter

        const tr =
        tablerBills.querySelector(`[data-id-bill="${activeBillId}"]`);
        // on recupere le td contenant le prix + mise a jour
        td = tr.querySelector("td:nth-child(3)");
        td.textContent = total;
        td = tr.querySelector("td:nth-child(4)");
        td.textContent = createdAt;
    }

    // initialise le module bills, le callback observer est exécuté au déclenchement de l'event DOMContentLoaded
    window.addEventListener("DOMContentLoaded", observer);

}());
