# invite-panel
知乎邀请面板
##DEMO地址
<a href="http://ifable.cn/works/new/invite/" target="_blank">ifable.cn/works/new/invite/</a>
## 功能说明
界面如图所示
![preview](preview.png)
- 下面的邀请按钮有「邀请」和「收回」两个状态；
- 邀请或收回时，更新上方的 「您已邀请 x 等 n 人」的链接和文字；

## 实现说明
邀请面板页面内容来自一份JSON文件，本例涉及到CSS布局、DOM操作以及数据呈现，其中难点在数据呈现

本例采用Ajax加载JSON文件，解析之后通过DOM操作将数据呈现。使用jQuery库完成DOM操作，jQuery版本为v1.11.3。

首先通过$(document).ready()函数在DOM加载完后执行相关代码，该部分主要涉及JSON数据的获取、解析及数据的DOM呈现，还有后续相关函数的执行（这些函数不在此处定义）
-  使用$.getJSON()函数加载JSON数据并解析：详见script.js中2~4行
-  使用$.each()函数遍历解析后的数据，通过append()方法实现相关DOM的创建加载：详见script.js中6~20行
-  最后是自定义函数inviteStatus()和changeInviteStatus()的执行
 
接下来是函数changeInviteStatus()定义，该函数涉及的功能有邀请按钮颜色与文字的变化以及上方邀请状态（您已邀请 程毅南、田吉顺等 3 人）的变化。分析可知邀请按钮的变化会引起上方邀请状态的改变，故需要在按钮变化时执行上方邀请状态变化的函数inviteStatus()。
-  当点击按钮时，先判断按钮是否是未邀请状态，如果是，则将按钮颜色和文字设置为已邀请状态，并获取按钮关联的被推荐人的姓名，将其放入数组invitedName中；否则，将按钮颜色和文字设置为未邀请状态，并获取按钮关联的推荐人的姓名，将其从数组invitedName中删除。详见script.js中31~41行
-  随后将更新后的invitedName数组作为参数传给函数inviteStatus()执行

最后是函数inviteStatus()的定义，该函数主要完成的功能是通过对已邀请人数invitedNum的判断，实现不同人数下邀请状态文字的不同呈现。
-  对已邀请人数invitedNum的判断使用了switch-case
-  通过$.each()函数对数组invitedUser进行遍历呈现，使用了return true，完成对邀请人姓名呈现个数的限制和呈现出姓名的不断变化（当已邀请超过两人时，始终显示最后邀请的两人）
