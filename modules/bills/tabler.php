<div id="bills_wrap">
    <?php if (isset($bills) && !count($bills)): ?>
        <p id="msg_empty_bills">Pas de factures pour le moment ...</p>
    <?php endif; ?>

    <?php if (isset($bills) && count($bills)): ?>

    <table id="tabler_bills" class="tabler bills">
        <thead>
          <tr>
            <?php foreach ($bills[0] as $prop => $val) {
                echo "<th>$prop</th>";
            }?>
            <th class="update">
                <span>update</span>
          </th>
            <th class="delete">
                <input type="submit" id="delete_bills" value="delete" class="tabler-btn">
                
            </th>
          </tr>
        </thead>
        <tbody id="tabler_bills_body" >
        <?php foreach ($bills as $bill) {
            echo "<tr data-id-bill=\"$bill->id\" data-id-user=\"$bill->id_user\" class=\"bill\">";

            foreach ($bill as $prop => $val) {
                $val = isset($val) ? $val : "N.R";
                echo "<td>" . $val . "</td>";
            }
                echo "<td class=\"update\">
                    <span class=\"tabler-btn\">edit</span>
                </td>";
                echo "<td class=\"delete\">
                    <input type=\"checkbox\" />
                </td>";
            }
            echo "</tr>";
        ?>
        </tbody>
    </table>

    <?php endif; ?>
</div>
