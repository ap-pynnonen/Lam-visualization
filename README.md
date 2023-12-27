# lam-visualization (FI)

Opinnäytetyön tavoitteena on visualisoida Liikenteen Automaatisten Mitttauspisteiden (LAM) tuottamaa dataa. Visualisoinnin tavoite on saada nopealla vilkaisulla käsitys liikkemääristä, nopeuksista ja ajoneuvoluokista. Digitrafin palvelusta saa LAM-pisteiden dataa sekä reaaliaikaisena että historiatietoja, joista tässä opinnäytetyössä käytetään historiadataa johtuen sen tarkkuudesta. LAM-pisteiden visualisointi tapahtuu kartalle, josta käyttäjä pysyy valitsemaan lähempään tarkasteluun haluamansa LAM-pisteen. Kyseisen LAM-pisteen tuottaa dataa pitää pystyä tarkasteleen ainakin 1/3/7 vuorokauden historiatietoja. 

Toimeksiantaja: JAMK/IT-Instituutti, Tieto tuottamaan- hanke

Yhteyshenkilöt:
Mika Rantonen,
Janne Alatalo,
Tuomo Sipola

Datan visualisointi

- Aika: Viimeisen 1/3/7 vrk:n (käyttäjän valinta)
- LAM-pisteet kartalle:
    - Miten visualisoidaan LAM-piste
    - Valinta kartalta suoraan klikkaamalla LAM-pistettä
- Mitä visualisoidaan:
    - Ajoneuvomäärät
        - Kaikki (pitääkö pystyä valitsemaan ajoneuvoluokka)?
        - Aikasarjan visualisointi
    - Nopeudet
        - Miten visualisoidaan?
        - Ylinopeudet
    - Saisiko laskettua turvavälit ja niiden visualisointi 

Ajatuksena käyttäjän nopeasti nähtävä visualisoinnista esim ylinopeudet, ajoneuvomäärät

Digitrafin sivusto: https://www.digitraffic.fi/tieliikenne/

---

Docker

Docker kontin portti: 80

Kontin prefix /lam-visualization

# lam-visualization (EN)

The goal of the thesis is to visualize automatic traffic measurement points (LAM) data. The goal of the visualization is to give understanding with a quick look of the traffic amounts, speeds and vehicle classes. Digitrafis servises give out free Lam data with both realtime and history data, from which history data is being used for thesis due to its accuracy. Lam measurement points are going to be visualized on a map from which user can select one, and view that specific Lam measurement points data. The specific Lam measurement points generated data must be atleast vieved from 1/3/7 days history data.

Client: JAMK/IT-Institute, Tieto tuottamaan -project

Contact persons:
Mika Rantonen,
Janne Alatalo,
Tuomo Sipola

Data visualization

- Time: Last 1/3/7 days (user selection)
- LAM measurement points to map:
    - How to visualize LAM measurements points
    - Selection from map to directly click Lam measurement point
- What to visualize:
    - Vehicle amounts
        - All (Can you select specific vehicle class)?
        - Time series visualization
    - Speeds
        - How to visualize?
        - Overspeeding
    - Could you calculate safety distance and their visualization

The idea is for the user to quickly see from the visualization, for example, overspeeding, vehicle amounts

Digitrafi webpage: https://www.digitraffic.fi/tieliikenne/