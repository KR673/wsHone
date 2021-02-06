import re

#  移除文件中 指定字符多于1码的行(王土大木目日口田山禾白月金言立火子女又)
def special_word_handler():
    word_special = r'(王|土|大|木|目|日|口|田|山|禾|白|月|金|言|立|火|子|女|又)\s+\w{2,}.*'

    with open('./pythonScript/wubi86.dict.yaml', 'r', encoding='utf-8') as file:
        lines = file.readlines()

    with open('./pythonScript/wubi86.dict.yaml', 'w', encoding='utf-8') as file:

        count = len(lines)
        index = 0

        for line in lines:

            index = index + 1
            print('\r' + str(index * 100 // count) + '%')
            if re.match(word_special, line):
                continue
            file.write(line)

if __name__ == "__main__":
    for i in range(0, 10):
        print('\rtest', end='')