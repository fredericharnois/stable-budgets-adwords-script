/**
*
* Stable Daily Budget Script
*
* If scheduled hourly, this script will pause campaigns if they have
* spent more than their daily budget and reactivate them the next day.
*
* Version: 1.0
* Google AdWords Script maintained by Frederic Harnois
*
**/

function main() {

	// Selects campaigns with a chosen label
	// Insures only those campaigns are activated or paused
	var campaignSelector = AdWordsApp
		.campaigns()

		// Define your own label here
		.withCondition("LabelNames CONTAINS_ANY ['Active']")

	// Goes through the selected campaigns
	var campaignIterator = campaignSelector.get();
	while (campaignIterator.hasNext()) {
		var campaign = campaignIterator.next();

		// Gets the campaign's budget
		var budget = campaign.getBudget();

		// Gets the campaign's spend over the current day
		var stats = campaign.getStatsFor("TODAY");
		var cost = stats.getCost()
		Logger.log("Campaign name: " + campaign.getName());
		Logger.log("Daily budget: " + budget.getAmount());
		Logger.log("Today's spend: " + cost);

		// Pauses the campaign if the spend exceeds the budget
		if (cost > budget.getAmount()){
			campaign.pause();
			Logger.log("Campaign paused");
			Logger.log("================");
			}

			// Activates or leaves the campaign on if the spend spend does not exceed the budget
			else if (cost < budget.getAmount()){
				campaign.enable();
				Logger.log("Campaign enabled");
				Logger.log("================");
		}
	}
}


