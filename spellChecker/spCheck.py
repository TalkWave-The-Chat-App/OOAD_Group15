from nltk import word_tokenize
from nltk.corpus import stopwords
import string
punctuations = string.punctuation
import nltk
nltk.download('stopwords')
sent = "The main challenge, is to start!"
stop = stopwords.words('english') + list(punctuations)
nltk.download('punkt')
from nltk.stem import PorterStemmer
porter = PorterStemmer()
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()
nltk.download('wordnet')
from sklearn.feature_extraction.text import TfidfVectorizer
corpus = [
    'This is the first document.',
    'This document is the second document.',
    'And this is the third one.',
    'Is this the first document?',
]
vectorizer = TfidfVectorizer(stop_words=stop) #stop was defined initially using stopwords from NLTK
X = vectorizer.fit_transform(corpus)
import re                                  #regular expression
from collections import Counter            #creating frequency count dict
import heapq                               #for selecting n largest
import os
def words(text): return re.findall(r'\w+', text.lower())
WORDS = Counter(words(open('/home/anjalika/spellChecker/spelling_text.txt').read()))
def P(word, N=sum(WORDS.values())):
    "Probability of `word`."
    return WORDS[word] / N
def correction(word):
    "Most probable spelling correction for word."
    listProb = {word: P(word) for word in candidates(word)}
    return listProb, max(candidates(word), key=P)

def candidates(word):
    "Generate possible spelling corrections for word."
    return (known([word]) or known(edits1(word)) or known(edits2(word)) or [word])

def known(words):
    "The subset of `words` that appear in the dictionary of WORDS."
    return set(w for w in words if w in WORDS)
def edits1(word):
    "All edits that are one edit away from `word`."
    letters    = 'abcdefghijklmnopqrstuvwxyz'
    splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
    deletes    = [L + R[1:]               for L, R in splits if R]
    transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
    replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
    inserts    = [L + c + R               for L, R in splits for c in letters]
    return set(deletes + transposes + replaces + inserts)

def edits2(word):
    "All edits that are two edits away from `word`."
    return (e2 for e1 in edits1(word) for e2 in edits1(e1))
def get_correct_word(word):
    corrected_word = next(iter(correction(word)[0]))
    print("Word passed: ", word, " Word corrected To: ", corrected_word)
    return corrected_word
s=input("Enter sentence to be checked ")
x=s.split()
corrected=[]
for i in x:
  c=get_correct_word(i)
  corrected.append(c)