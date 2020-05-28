var cnt=0;
var url = window.location.toString();

var problem_pattern = "page=show_problem";
var flag = url.includes(problem_pattern);
if(flag){
	var submitted = url.includes("Submission+received");
	if(submitted){
		console.log("Yes");
		setTimeout(check_verdict, 2000);
	}
}
function check_verdict()
{
	chrome.runtime.sendMessage({submitted: true});
	var g = document.querySelector("#col3_content_wrapper").querySelector("table").querySelectorAll("td");
	var x = document.querySelector("#local");
	if(x==null){
		var tag = document.createElement("h5");
		g[2].appendChild(tag);
		g[2].querySelector("h5").setAttribute("id", "local");
		x = document.querySelector("#local");
	}
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		console.log(request.Verdict);
		var fin_ver = request.Verdict;
		if(cnt>10){
			return;
		}
		x.innerHTML = fin_ver;
		if(fin_ver=="In judge queue"){
			cnt++;
			setTimeout(check_verdict, 2000);	
		}
	});
}