import pandas


def main():
    df = pandas.read_excel("./src/data/dates.xlsx", sheet_name="Sheet1")
    df["date"] = df["date"].dt.strftime("%Y-%m-%d")
    json = df.to_json(orient="records")
    with open("./src/data/data.json", "w") as f:
        f.write(json)


if __name__ == "__main__":
    main()
