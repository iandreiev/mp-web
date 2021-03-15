// JS PDF
import { jsPDF } from "jspdf";

Ticket.jsTicket = (data) => {
    const options = {
        orientation: 'portait',
        unit: 'mm',
        format: [297,210]
    }
    const doc = new jsPDF(options);
    doc.text(data.amount, 10,10)
    console.log(data.amount, data.coin)
    doc.save(data.ticket +'.pdf')

}

module.exports = Ticket