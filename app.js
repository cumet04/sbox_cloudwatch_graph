const AWS = require("aws-sdk");
const fs = require("fs");

async function getMetricImage(props, output) {
    try {
        const result = await new AWS.CloudWatch()
            .getMetricWidgetImage({ MetricWidget: JSON.stringify(props) })
            .promise();
        console.log(result);
        fs.writeFileSync(output, result.MetricWidgetImage);
    } catch (e) {
        console.log(e);
    }
}

getMetricImage(
    {
        width: 500,
        height: 400,
        start: "-PT3H",
        end: "PT0H",
        view: "timeSeries",
        stacked: false,
        metrics: [
            [
                "AWS/EC2",
                "CPUUtilization",
                "AutoScalingGroupName",
                "AS_GROUP_NAME"
            ]
        ],
        stat: "Average",
        period: 60
    },
    "./test.png"
);
