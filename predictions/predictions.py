import pandas as pd
from fbprophet import Prophet
from flask import Flask
from flask import jsonify

app = Flask(__name__)

covid_data = pd.read_csv('http://coronavairus.herokuapp.com/brazil/csv') # dataset

def normalizer_date(date):
    result = ''
    for i in range(10):
        result += date[i]
    return result

def normalizer_results(num):
    result = int(num)
    return result


def predicao(covid_data):
  covid_data['date'] = covid_data.date.apply(normalizer_date)
  covid_data['date'] = pd.to_datetime(covid_data['date'])

  covid_newDeaths = covid_data[['date','newDeaths']]
  covid_newDeaths.columns = ['ds','y']

  covid_newCases = covid_data[['date','newCases']]
  covid_newCases.columns = ['ds','y']

  mDeaths = Prophet(interval_width= 0.90)
  mDeaths.fit(covid_newDeaths)
  predict = mDeaths.make_future_dataframe(periods=7)
  preview = mDeaths.predict(predict)

  data = preview[['ds','yhat_lower','yhat','yhat_upper']].tail(7)

  data.columns = ['data','previsao_baixa','previsao_media','previsao_alta']



  data['previsao_baixa'] = data.previsao_baixa.apply(normalizer_results)
  data['previsao_media'] = data.previsao_media.apply(normalizer_results)
  data['previsao_alta'] = data.previsao_alta.apply(normalizer_results)
  return data

pred = predicao(covid_data)
dates = pred['data'].values
pred_alta_ = pred['previsao_alta'].values
pred_med_ = pred['previsao_media'].values
pred_baixa_ = pred['previsao_baixa'].values


dates_ = []
prediction_alta = []
prediction_med = []
prediction_baixa = []
prediction_date = []


for v in dates:
   dates_.append(str(v))
    
for v in pred_alta_:
    prediction_alta.append(int(v))

for v in pred_med_:
    prediction_med.append(int(v))

for v in pred_baixa_:
    prediction_baixa.append(int(v))

res = []

for i in range(len(pred_alta_)):
    res.append({"date": dates_[i], "prediction_low": prediction_baixa[i], "prediction_med": prediction_med[i], "prediction_high": prediction_alta[i]})


@app.route("/")
def prediction():
    return {"data" : res}


if __name__ == '__main__':
    app.run(debug=True)