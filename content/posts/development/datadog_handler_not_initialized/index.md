---
title: 'Datadog, Serverless and AWS Lambda: "datadog:handler not initialized" issue'
description: 'How to fix the "datadog:handler not initialized" error in aws lambda when using the datadog-lambda-js component'
date: '2022-03-16'
tags:
  - datadog
  - aws
  - lambda
  - serverless
---
  
---

In this post I'll describe how to fix the **datadog:handler not initialized** issue, which may happen to you if you're using the 
[datadog-lambda-js](https://github.com/DataDog/datadog-lambda-js) library in a project deployed in a lambda which already
has the **Datadog Lambda layer**. 

The fix described here applies to projects using [Serverless](https://github.com/serverless/serverless)
with the [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) plugin. Nevertheless, if you're not using
these tools, but you're having this issue anyway, the solution described here may also be useful for you since the way to fix it
is probably very similar.

---

### Article Contents

* [Problem Description](#problem-description)
* [How to Fix it?](#how-to-fix-it)
* [Additional Information](#additional-information)
* [Conclusion](#conclusion)


### Problem Description

This error appears when you try to send a metric with, for example, the **sendDistributionMetricWithDate** function from the **datadog-lambda-js** library. Looking at 
the code of [this function](https://github.com/DataDog/datadog-lambda-js/blob/35580a1efb714e25b5c7db1310efeee3132fc6e3/src/index.ts#L181), 
we can see that the error is logged when the **currentMetricsListener** variable is not set. This variable is set [here](https://github.com/DataDog/datadog-lambda-js/blob/35580a1efb714e25b5c7db1310efeee3132fc6e3/src/index.ts#L115), which basically happens when 
your lambda function being wrapped by this library is executed.

So, with this information, we can conclude that:

* The error happens if **currentMetricsListener** variable is not set.
* This variable is always set just before our lambda function is executed.
* Our lambda function is executed since we're calling a function from the **datadog-lambda-js** library to send some metrics.
* With all this in mind: How is it possible that our lambda function is being called but the **currentMetricsListener** variable is still not set?

The answer is: The **datadog-lambda-js** library is being loaded more than once! :O

The issue here is that the **Datadog Lambda Layer** already provides this library, so we must make sure we're not including it in our lambda inside the
**node_modules** directory. And here is the main problem lies: If you're using Serverless and its webpack plugin, there's a [known issue](https://github.com/serverless-heaven/serverless-webpack/issues/306) 
with the exclusion of transitive dependencies. So, even if you add **datadog-lambda-js** to the exclusion list, **it's possible that
it's being included anyway!**.


### How to Fix it?

The hard part was actually finding where the issue was. The fix is pretty straightforward. You just need to force the removal
of the **datadog-lambda-js** library from your **node_modules** before publishing your code to the lambda. In Serverless, you
can do it this way:

{{< highlight yaml "linenos=table,linenostart=1" >}}
custom:
  webpack:
    packagerOptions:
      scripts:
        - rm -rf node_modules/datadog-lambda-js
        # Also, remember that some libraries may depend on datadog-lambda-js too, so this library could be 
        # embedded into their own node_modules directory.
        - rm -rf node_modules/some-other-dependency/node-modules/datadog-lambda-js 
{{< / highlight >}}

If you're not using serverless and its webpack plugin, but you're still having this issue, the fix may be the same. Just 
remove any **datadog-lambda-js** directory inside your **node_modules**.

To make sure that the library was effectively skipped when publishing your project, you can follow this steps:

* Go to the **AWS Lambda** section in the AWS Portal.
* Search for your lambda.
* Click on the **Actions** select and then choose the **Export** option.
* Download the **zip** file containing the code that is published in your lambda.
* Unzip it and search for the **datadog-lambda-js** folder inside **node_modules**. If at least one **datadog-lambda-js** folder is still there, make sure you've used the correct commands to remove them!


### Additional Information

* There's an [issue in the datadog-lambda-js project](https://github.com/DataDog/datadog-lambda-js/issues/209) where I've added a [comment](https://github.com/DataDog/datadog-lambda-js/issues/209#issuecomment-1024746511) with these findings and the related [PR](https://github.com/DataDog/documentation/pull/12957) with the corresponding update in the Datadog documentation.
* And [here](https://github.com/serverless-heaven/serverless-webpack/issues/306) is the related issue in the **serverless-webpack** plugin which mentions the problem with the exclusion of transitive dependencies.


### Conclusion

And this is the end of the first post of my site. I hope this helps you guys to fix this annoying issue.

Sayonara!
