import { hours } from "../data/hours.js";
import stylesheet from "../styles/index.css?inline";
const JTHoursTableTemplate = document.createElement("template");
JTHoursTableTemplate.innerHTML = `
    <style>
        ${stylesheet}
        .hours-table {
            background: transparent;
        }
        table {
            margin-top: 1rem;
        }
        td {
            border-bottom: 0px;
        }
        td:first-child {
            padding-left: 5px;
        }
        td:last-child {
            min-width: 130px;
            padding-right: 5px;
        }
        tbody tr td:last-child,
        thead tr th:last-child {
            border-left: 1px solid black;
        }
        .openHour{
        	min-width: 130px;
        }
    </style>
    <table class="md:text-lg text-md">
        <thead>
            <tr>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Sunday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Monday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Tuesday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Wednesday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Thursday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Friday</td>
                <td class="openHour"></td>
            </tr>
            <tr>
                <td>Saturday</td>
                <td class="openHour"></td>
            </tr>
        </tbody>
    </table>
`;

class JTHoursTable extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).appendChild(
			JTHoursTableTemplate.content.cloneNode(true)
		);
	}

	connectedCallback() {
		this.shadowRoot.querySelectorAll(".openHour").forEach((entry, key) => {
			let day = hours[key];
			entry.innerHTML = day.isOpen ? day.start + " - " + day.end : "Closed";
		});
	}
}

window.customElements.define("jt-hours-table", JTHoursTable);
