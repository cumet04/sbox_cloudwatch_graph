const AWS = require("aws-sdk");
const fs = require("fs");

const test = async () => {
  const props = {
    width: 500,
    height: 400,
    start: "-PT3H",
    end: "PT0H",
    view: "timeSeries",
    stacked: false,
    metrics: [
      ["AWS/EC2", "CPUUtilization", "AutoScalingGroupName", "AS_GROUP_NAME"],
      [
        "AWS/EC2",
        "NetworkOut",
        "InstanceId",
        "i-XXXX",
        {
          yAxis: "right"
        }
      ]
    ],
    stat: "Average",
    period: 60
  };
  const widgetDefinition = {
    MetricWidget: JSON.stringify(props)
  };

  const cloudwatch = new AWS.CloudWatch();
  try {
    const result = await cloudwatch
      .getMetricWidgetImage(widgetDefinition)
      .promise();
    console.log(result);
    fs.writeFileSync("./test1.png", result.MetricWidgetImage);
  } catch (e) {
    console.log(e);
  }
};
test();
