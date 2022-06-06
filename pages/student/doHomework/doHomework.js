const app = getApp()

import deviceUtil from "../../../miniprogram_npm/lin-ui/utils/device-util"

Page({
    data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        exercises:[
            { question: "1.小明家离学校有200米，那么请问小明的妈妈几岁？",
              category: "singleObjective",
              choices:[{choiceNumber:"A",choice:"赵"},{choiceNumber:"B",choice:"钱"},{choiceNumber:"C",choice:"孙"},        {choiceNumber:"D",choice:"李"}] },
            { question: "2.以下哪些数字是质数？",
              category: "multipleObjective",
              choices:[{choiceNumber:"A",choice:"1"},{choiceNumber:"B",choice:"2"},{choiceNumber:"C",choice:"3"},        {choiceNumber:"D",choice:"4"}] },
            { question: "3.小明家离学校有200米，写出小明学校的全称和小明的上学方式。",
              category: "subjective",
              answers:[{answer:"学校全程"},{answer:"上学方式"}] }
        ]
    }
})