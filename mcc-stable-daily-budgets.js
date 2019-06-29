/**
*
* Stable Daily Budget Script
* MCC Level
*
* If scheduled hourly, this script will pause campaigns if they have
* spent more than their daily budget and reactivate them the next day.
*
* Version: 1.0.1
*
* Google Ads Script maintained by Frederic Harnois
* fred@fredericharnois.com
*
**/

function main() {

	// Get accounts within MCC
	var accountSelector = MccApp.accounts()

		// Choose your accounts (CIDs)
		.withIds(['INSERT CIDs HERE']);
	var accountIterator = accountSelector.get();

	// Iterate through the list of accounts
	while (accountIterator.hasNext()) {

		// Get account info
		var account = accountIterator.next();    
		var accountName = account.getName();

		// Select the client account
		MccApp.select(account);
		Logger.log(accountName);

		// Selects campaigns with a chosen label
		// Insures only those campaigns are activated or paused
		var campaignSelector = AdWordsApp
			.campaigns()

			// Define your own label here
			// IMPORTANT NOTE: LABEL IS CASE SENSITIVE
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
				Logger.log("Today's campaign spend EXCEEDS the daily maximum!");
				Logger.log("Campaign paused");
				Logger.log("================");
				}

				// Activates or leaves the campaign on if the spend spend does not exceed the budget
				else if (cost < budget.getAmount()){
					campaign.enable();
					Logger.log("Today's campaign spend DOES NOT exceed the daily maximum.");
					Logger.log("Campaign remains enabled");
					Logger.log("================");
			}
		}
	}
}


