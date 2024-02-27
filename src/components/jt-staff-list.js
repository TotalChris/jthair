import stylesheet from "../styles/index.css?inline";
import fetchStaff from "../data/fetchStaff";
const JTStaffListItemTemplate = document.createElement("template");
JTStaffListItemTemplate.innerHTML = `
        <div class="staff-item" id="">
            <img src="" height="150px" width="150px" class="rounded-full select-none" alt="" />
            <div class='pl-4 bio'>
                <h1 class='font-bold text-center text-4xl text-black my-2'></h1>
                <hr style="height: 2px; width: 100%;">
                <h2 class="text-2xl font-medium italic text-gray-500"></h2>
            </div>        
        </div>
`;
const JTStaffListTemplate = document.createElement("template");
JTStaffListTemplate.innerHTML = `
    <style>
        ${stylesheet}
        .staff-item{
            display: flex;
            flex-direction: row;
            height: 170px;
            width: auto;
        }
        .staff-item img{
        	height: 150px;
        	width: 150px;
        	border-radius: 75px;
        }
        .staff-item .bio{
        	display: flex;
        	flex-direction: column;
            justify-content: space-between;
            height: 120px;
        }
    </style>
    <div class="min-w-screen lg:max-w-5xl 2xl:max-w-7xl mt-4 mx-4 flex flex-col" id="staffListRoot"></div>
`;
class JTStaffList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).appendChild(
			JTStaffListTemplate.content.cloneNode(true)
		);
		this.staffListRoot = this.shadowRoot.querySelector("#staffListRoot");
	}

	async connectedCallback() {
        const staff = await fetchStaff();
        staff.forEach((member, idx, arr) => {
			let el = JTStaffListItemTemplate.content.cloneNode(true);
			el.querySelector("img").src = member.image;
			el.querySelector("img").setAttribute("alt", member.name);
			el.querySelector(".staff-item").setAttribute("id", "staff-" + idx);
			el.querySelector(".bio h1").innerHTML = member.name;
			el.querySelector(".bio h2").innerHTML = member.jobTitle;
			this.staffListRoot.appendChild(el);
		});
	}

}

window.customElements.define("jt-staff-list", JTStaffList);
