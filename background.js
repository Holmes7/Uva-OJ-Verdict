var ver="queue";
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("e");
	if(request.submitted==true){
		console.log("e");
		getVerdict();
		
	}
})
function getVerdict(sr)
{
	fetch("https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=9").then(response=>response.text()).then(function (data){
	var my_sub_str=data;
	var my_submissions = document.createElement("html");
	my_submissions.innerHTML = my_sub_str;
	var xtable = my_submissions.querySelectorAll("table");
	var lastsub = xtable[2].querySelector("tr.sectiontableentry1");
	var alltd = lastsub.querySelectorAll("td");
	var verdict = alltd[3].innerHTML;
	console.log(verdict);
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {Verdict: verdict});
	});
});
}

