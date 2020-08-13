window.addEventListener("load", getjson, false);

// function link_events() { // get file
// document.getElementById("search").onclick = getjson; // make button clicky
// }

var xhr;

function getjson() {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", showFile, false);
    xhr.open("GET","RCUcalendar.json");
    xhr.send();
    
return false; // keep php from submitting
}


function showFile() {

 if (xhr.readyState == 4 && xhr.status == 200) {

    var i; // iteration for projects
    var m; // iteration for months
    var table = "<table>";
    var tablehdg =  "<tr class=\"hdg\">" +
                       "<th>Team</th>" +
                       "<th>Project Name</th>" +
                        "<th>End Month</th>" +
                       "<th>Project Owner</th>" +
                       "<th>Notes</th>" +
                 "</tr>";
	var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	for (m=0; m < months.length; m++) {
	table += "<tr>" + 
				"<th colspan=\"5\">" + months[m] + "</th>" + tablehdg +
			"</tr>";

   var project = JSON.parse(xhr.responseText).projects;
   //var startMonth = project.StartMonth;
	    for (i = 0; i < project.length; i++) {
			if (project[i].StartMonth == months[m]) {
			var teamRow = project[i].Team;
			teamRow = teamRow.split(" ").join(""); 
		   table += "<tr class=\""  + teamRow + "\">" +
						"<td>" + project[i].Team + "</td>" +
						"<td>" + project[i].ProjectName + "</td>" +
						"<td>" + project[i].EndMonth + "</td>" +
						"<td>" + project[i].ProjectOwner + "</td>" +
						"<td>" + project[i].Notes + "</td>" +
					"</tr>";
			} // end if month
        } // end for loop for projects
      } // end for loop for months  
    table += "</table>";
    
 document.getElementById("calendar").innerHTML = table;


 } // end if xhr 

} // end function showFile