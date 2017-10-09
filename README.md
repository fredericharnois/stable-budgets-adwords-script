# Stable Daily Budgets AdWords Script

This script was built to mitigate [AdWord's recent change in the way daily budgets are handled](https://support.google.com/adwords/answer/1704443). It should insure that the actual spend of a campaign on any given day is close to its daily budget.

## Setup

The only part of the script that needs to be modified is the label you'll be using to limit the script to specific campaigns:

```javascript
// Define your own label here
.withCondition("LabelNames CONTAINS_ANY ['Active']")
```

This insures that inactive campaigns don't suddenly start running again.

You'll also want to schedule the script to run hourly.

## Limitations

- Adwords scripts can only run once an hour.
  - This means that the actual spend of a campaign can still go over its daily budgets.
  - However, in the vast majority of cases, it should pause the campaign before it spends twice its daily budget.
 - This script has been tested in accounts with 10s of campaigns.
   - There is a good chance it times out if it runs at the MCC level or in accounts with many 100s/1000s of campaigns. 

## Other Considerations

While I understand why a tool like this one is necessary to certain advertisers due to limited budgets or non-monthly flighted campaigns, [Andrew McGarry](https://twitter.com/beyondcontent) made some [very good points](https://twitter.com/beyondcontent/status/916003421358051329) as to why this might be going against Google's vision for AdWords.

There's no denying that this change could have been better advertised and that Google could have given us a transition period to educate clients/stakeholders. That being said, the features they have been adding in recent months/years have been pointing towards the increased role of automation in PPC campaign management. Furthermore, their algorithm-based products (universal app campaigns, smart bidding options) have been getting noticeably better recently.
   
