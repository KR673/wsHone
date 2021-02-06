import re
import json

words = '的一是了不在有个人这上中大为来我到出要以时和地们得可下对生也子就过能他会多发说而于自之用年行家方后作成开面事好小心前所道法如进着同经分定都然与本还其当起动已两点从问里主实天高去现长此三将无国全文理明日些看只公等十意正外想间把情者没重相那向知因样学应又手但信关使种见力名二处门并口么先位头回话很再由身入内第平被给次别几月真立新通少机打水果最部何安接报声才体今合性西你放表目加常做己老四件解路更走比总金管光工结提任东原便美及教难世至气神山数利书代直色场变记张必受交非服化求风度太万各算边王什快许连五活思该步海指物则女或完马强言条特命感清带认保望转传儿制干计民白住字它义车像反象题却流且即深近形取往系量论告息让决未花收满每华业南觉电空眼听远师元请容她军士百办语期北林识半夫客战院城候单音台死视领失司亲始极双令改功程爱德复切随李员离轻观青足落叫根怎持精送众影八首包准兴红达早尽故房引火站似找备调断设格消拉照布友整术石展紧据终周式举飞片虽易运笑云建谈界务写钱商乐推注越千微若约英集示呢待坐议乎留称品志黑存六造低江念产刻节尔吃势依图共曾响底装具喜严九况跟罗须显热病证刚治绝群市阳确究久除闻答段官政类黄武七支费父统'

wordMapTo = {}
if __name__ == "__main__":
    # 为什么这里需要从父级目录开始?????
    with open('./pythonScript/wubi86.dict.yaml', 'r', encoding='utf-8') as file:
        for line in file.readlines():
            lineInfo = re.split(r'\s+', line)
            word = str(lineInfo[0])
            code = str(lineInfo[1])
            weight = float(lineInfo[2])
            if wordMapTo.get(word) is None or len(wordMapTo[word]['key']) > len(code):
                wordMapTo[word] = {'word' : word, 'key' : code, 'weight' : weight}

    outcome = []
    for w in re.split(r'\B', words):
        if re.match('^[\u4e00-\u9fa5]{0,}$', w) and wordMapTo.get(w) is not None:
            outcome.append(wordMapTo.get(w))

    with open('./pythonScript/tempData.js', 'w', encoding='utf-8') as file:
        file.write("dataSource=" + str(outcome))

