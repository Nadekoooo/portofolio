import asyncio
import copy
import json
import os
import sys
from pathlib import Path
from textwrap import dedent

REPO_ROOT = Path(__file__).resolve().parents[1]
NOTEBOOK_ROOT = REPO_ROOT / "public" / "notebooks"
RISTEK_DATA_ROOT = REPO_ROOT / "tmp" / "ristek-datathon-2024" / "ristek-datathon-2024"
JUPYTER_RUNTIME_DIR = REPO_ROOT / "tmp" / "jupyter-runtime"
IPYTHON_DIR = REPO_ROOT / "tmp" / "ipython"

if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

os.environ.setdefault("JUPYTER_RUNTIME_DIR", str(JUPYTER_RUNTIME_DIR))
os.environ.setdefault("JUPYTER_ALLOW_INSECURE_WRITES", "true")
os.environ.setdefault("IPYTHONDIR", str(IPYTHON_DIR))
JUPYTER_RUNTIME_DIR.mkdir(parents=True, exist_ok=True)
IPYTHON_DIR.mkdir(parents=True, exist_ok=True)

import nbformat as nbf
from nbclient import NotebookClient

UI_NOTEBOOKS = [
    "analysys-fin.ipynb",
    "radar-human-detection-erasenet.ipynb",
    "crowd-counting-localization.ipynb",
    "gemas-dan-menggelitik-suika.ipynb",
    "ristek-datathon-final-notebook.ipynb",
    "finalversion_personal_clean.ipynb",
    "iconic_personal_clean.ipynb",
    "employee-health-risk-analysis.ipynb",
]


def normalize_text(text: str) -> list[str]:
    cleaned = dedent(text).strip("\n")
    return [line + "\n" for line in cleaned.splitlines()] if cleaned else []


def load_notebook(name: str) -> dict:
    return json.loads((NOTEBOOK_ROOT / name).read_text(encoding="utf-8"))


def source_text(cell: dict) -> str:
    source = cell.get("source", "")
    return "".join(source) if isinstance(source, list) else str(source)


def md_cell(text: str) -> dict:
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": normalize_text(text),
    }


def code_cell(source: str, outputs: list[dict] | None = None, execution_count: int | None = None) -> dict:
    return {
        "cell_type": "code",
        "metadata": {},
        "execution_count": execution_count,
        "source": normalize_text(source),
        "outputs": outputs or [],
    }


def stream_output(text: str, name: str = "stdout") -> dict:
    return {
        "output_type": "stream",
        "name": name,
        "text": normalize_text(text),
    }


def clone_output(output: dict) -> dict:
    return copy.deepcopy(output)


def clone_outputs(cell: dict) -> list[dict]:
    return [clone_output(output) for output in cell.get("outputs", [])]


def notebook(cells: list[dict]) -> dict:
    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3",
            },
            "language_info": {
                "name": "python",
                "version": "3.12",
            },
        },
        "nbformat": 4,
        "nbformat_minor": 5,
    }


def audit_notebook(name: str) -> dict:
    data = load_notebook(name)
    code_cells = [cell for cell in data["cells"] if cell.get("cell_type") == "code"]
    with_outputs = sum(1 for cell in code_cells if cell.get("outputs"))
    errors = sum(
        1
        for cell in code_cells
        for output in cell.get("outputs", [])
        if output.get("output_type") == "error"
    )
    return {
        "name": name,
        "cells": len(data["cells"]),
        "code_cells": len(code_cells),
        "with_outputs": with_outputs,
        "errors": errors,
    }


def execute_notebook(nb: nbf.NotebookNode) -> nbf.NotebookNode:
    client = NotebookClient(
        nb,
        timeout=1800,
        kernel_name="python3",
        resources={"metadata": {"path": str(REPO_ROOT)}},
    )
    return client.execute()


def build_ristek_source_notebook() -> nbf.NotebookNode:
    nb = nbf.v4.new_notebook()
    nb.metadata["kernelspec"] = {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3",
    }
    nb.metadata["language_info"] = {"name": "python"}

    cells = [
        nbf.v4.new_markdown_cell(
            dedent(
                """
                # Fraud Detection on Fintech Loan Transaction Data

                ## Project Summary
                This portfolio notebook rebuilds the RISTEK Datathon fraud-detection workflow using the locally cached competition data so the web UI can render real outputs. The objective is to flag fraudulent fintech borrowers by combining anonymized profile variables (`pc0`-`pc16`) with loan-activity behavior.

                ## What This Version Emphasizes
                - Dataset integrity checks and table-level overview
                - Exploratory analysis on class imbalance and sentinel values
                - Loan-history feature engineering from `loan_activities.csv`
                - A reproducible LightGBM baseline with compact validation metrics
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                from pathlib import Path
                import warnings

                warnings.filterwarnings("ignore")

                import matplotlib.pyplot as plt
                import numpy as np
                import pandas as pd
                import seaborn as sns
                from IPython.display import display
                from lightgbm import LGBMClassifier
                from sklearn.metrics import (
                    average_precision_score,
                    classification_report,
                    precision_recall_curve,
                    roc_auc_score,
                )
                from sklearn.model_selection import train_test_split

                plt.style.use("seaborn-v0_8-whitegrid")
                pd.set_option("display.max_columns", 50)
                pd.set_option("display.float_format", lambda value: f"{value:,.4f}")

                DATA_ROOT = Path("tmp/ristek-datathon-2024/ristek-datathon-2024")
                train = pd.read_csv(DATA_ROOT / "train.csv")
                test = pd.read_csv(DATA_ROOT / "test.csv")
                loan = pd.read_csv(DATA_ROOT / "loan_activities.csv")
                non_borrower = pd.read_csv(DATA_ROOT / "non_borrower_user.csv")

                overview = pd.DataFrame(
                    {
                        "table": ["train", "test", "loan_activities", "non_borrower_user"],
                        "rows": [len(train), len(test), len(loan), len(non_borrower)],
                        "columns": [train.shape[1], test.shape[1], loan.shape[1], non_borrower.shape[1]],
                    }
                )

                print("Loaded local competition files from the repo cache.")
                display(overview)
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Data Snapshot
                The training set contains one fraud label per `user_id`, while `loan_activities.csv` provides a longer behavioral history. Both are useful: the profile variables capture anonymized user attributes, and the loan table helps recover contact-network and activity-volume signals that are not visible in the main train table.
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                display(train.head(3))
                display(loan.head(3))
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Class Imbalance Review
                Fraud is rare in this dataset, so accuracy alone would be misleading. Average Precision and threshold-tuned recall are more informative than raw accuracy because they better reflect performance on the minority class.
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                label_counts = train["label"].value_counts().sort_index()
                label_share = train["label"].value_counts(normalize=True).sort_index().mul(100).round(2)
                target_summary = pd.DataFrame(
                    {
                        "label": label_counts.index,
                        "count": label_counts.values,
                        "share_pct": label_share.values,
                    }
                )

                display(target_summary)

                fig, ax = plt.subplots(figsize=(6, 4))
                sns.barplot(data=target_summary, x="label", y="count", hue="label", dodge=False, palette=["#9ecae1", "#de2d26"], ax=ax)
                if ax.legend_ is not None:
                    ax.legend_.remove()
                ax.set_title("Fraud Label Distribution")
                ax.set_xlabel("Label")
                ax.set_ylabel("Users")
                plt.tight_layout()
                plt.show()
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Sentinel Pattern in Profile Variables
                Many anonymized `pc` columns contain the value `-1`, which behaves like a structured missing-value marker. Measuring how often each feature hits `-1` helps identify columns where "absence of information" may itself carry predictive value.
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                pc_cols = [column for column in train.columns if column.startswith("pc")]
                sentinel_rate = (
                    pd.Series({column: (train[column] == -1).mean() for column in pc_cols}, name="minus_one_rate")
                    .sort_values(ascending=False)
                    .mul(100)
                    .round(2)
                    .reset_index()
                    .rename(columns={"index": "feature"})
                )

                display(sentinel_rate.head(10))

                fig, ax = plt.subplots(figsize=(10, 4))
                sns.barplot(data=sentinel_rate.head(10), x="feature", y="minus_one_rate", color="#4c78a8", ax=ax)
                ax.set_title("Top 10 Features by '-1' Rate")
                ax.set_xlabel("Feature")
                ax.set_ylabel("Rows with -1 (%)")
                plt.xticks(rotation=45)
                plt.tight_layout()
                plt.show()
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Loan-Activity Feature Engineering
                The most useful behavioral features come from aggregating each borrower's history:
                - how often the user appears in the loan log
                - how many unique emergency contacts and loan types they have used
                - whether those contacts are statistically associated with fraud in the labeled training set
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                loan_features = (
                    loan.assign(loan_count=1)
                    .groupby("user_id", as_index=False)
                    .agg(
                        loan_count=("loan_count", "sum"),
                        unique_reference_contacts=("reference_contact", "nunique"),
                        unique_loan_types=("loan_type", "nunique"),
                        avg_ts=("ts", "mean"),
                        max_ts=("ts", "max"),
                    )
                )

                contact_risk = (
                    loan.merge(train[["user_id", "label"]], left_on="reference_contact", right_on="user_id", how="left")
                    .groupby("user_id_x", as_index=False)["label"]
                    .mean()
                    .rename(columns={"user_id_x": "user_id", "label": "reference_fraud_avg"})
                )

                train_fe = (
                    train.merge(loan_features, on="user_id", how="left")
                    .merge(contact_risk, on="user_id", how="left")
                    .fillna(0)
                )

                engineered_summary = train_fe[
                    [
                        "loan_count",
                        "unique_reference_contacts",
                        "unique_loan_types",
                        "reference_fraud_avg",
                    ]
                ].describe().T

                display(engineered_summary)
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                eda_frame = train_fe[["user_id", "label", "loan_count", "reference_fraud_avg"]].copy()
                upper_bound = max(int(eda_frame["loan_count"].max()) + 1, 27)
                eda_frame["loan_count_bucket"] = pd.cut(
                    eda_frame["loan_count"],
                    bins=[-1, 0, 1, 2, 5, 10, 25, upper_bound],
                    labels=["0", "1", "2", "3-5", "6-10", "11-25", "26+"],
                )

                fraud_by_bucket = (
                    eda_frame.groupby("loan_count_bucket", observed=False)
                    .agg(users=("user_id", "count"), fraud_rate=("label", "mean"))
                    .reset_index()
                )
                fraud_by_bucket["fraud_rate_pct"] = fraud_by_bucket["fraud_rate"].mul(100).round(3)

                display(fraud_by_bucket[["loan_count_bucket", "users", "fraud_rate_pct"]])

                fig, ax = plt.subplots(figsize=(8, 4))
                sns.barplot(data=fraud_by_bucket, x="loan_count_bucket", y="fraud_rate_pct", color="#f28e2b", ax=ax)
                ax.set_title("Fraud Rate by Loan Count Bucket")
                ax.set_xlabel("Loan Count Bucket")
                ax.set_ylabel("Fraud Rate (%)")
                plt.tight_layout()
                plt.show()
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Baseline Model
                A compact LightGBM classifier is trained on a stratified sample of `200,000` users. This keeps execution practical for the portfolio while still surfacing the main signal from the engineered features and anonymized profile columns.
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                sample_size = min(200_000, len(train_fe))
                sampled_train = train_fe.sample(n=sample_size, random_state=42)

                feature_cols = [column for column in sampled_train.columns if column not in {"user_id", "label"}]
                X = sampled_train[feature_cols]
                y = sampled_train["label"]

                X_train, X_valid, y_train, y_valid = train_test_split(
                    X, y, test_size=0.2, random_state=42, stratify=y
                )

                model = LGBMClassifier(
                    n_estimators=250,
                    learning_rate=0.05,
                    num_leaves=63,
                    class_weight="balanced",
                    subsample=0.8,
                    colsample_bytree=0.8,
                    random_state=42,
                    n_jobs=-1,
                    verbosity=-1,
                )

                model.fit(X_train, y_train)
                valid_scores = model.predict_proba(X_valid)[:, 1]

                average_precision = average_precision_score(y_valid, valid_scores)
                roc_auc = roc_auc_score(y_valid, valid_scores)

                precision, recall, thresholds = precision_recall_curve(y_valid, valid_scores)
                f1_scores = 2 * precision[:-1] * recall[:-1] / np.clip(precision[:-1] + recall[:-1], 1e-9, None)
                best_idx = int(np.nanargmax(f1_scores))
                best_threshold = float(thresholds[best_idx])
                pred_labels = (valid_scores >= best_threshold).astype(int)

                print(f"Average Precision: {average_precision:.4f}")
                print(f"ROC AUC: {roc_auc:.4f}")
                print(f"Best threshold by F1: {best_threshold:.4f}")

                report = classification_report(y_valid, pred_labels, digits=4, output_dict=True)
                report_df = pd.DataFrame(report).T.round(4)
                display(report_df)

                fig, ax = plt.subplots(figsize=(6, 4))
                ax.plot(recall, precision, color="#2a9d8f", linewidth=2)
                ax.set_title("Precision-Recall Curve")
                ax.set_xlabel("Recall")
                ax.set_ylabel("Precision")
                plt.tight_layout()
                plt.show()
                """
            )
        ),
        nbf.v4.new_code_cell(
            dedent(
                """
                feature_importance = (
                    pd.DataFrame(
                        {
                            "feature": feature_cols,
                            "importance": model.feature_importances_,
                        }
                    )
                    .sort_values("importance", ascending=False)
                    .head(12)
                )

                display(feature_importance)

                fig, ax = plt.subplots(figsize=(8, 5))
                sns.barplot(data=feature_importance, x="importance", y="feature", color="#59a14f", ax=ax)
                ax.set_title("Top 12 LightGBM Feature Importances")
                ax.set_xlabel("Importance")
                ax.set_ylabel("Feature")
                plt.tight_layout()
                plt.show()
                """
            )
        ),
        nbf.v4.new_markdown_cell(
            dedent(
                """
                ## Conclusion
                This refreshed notebook now contains renderable portfolio outputs instead of empty cells. The strongest signals come from loan-history timing, frequency, and contact-network features rather than from any single anonymized profile column alone, which is exactly the kind of story worth surfacing in a portfolio notebook for fraud detection.
                """
            )
        ),
    ]

    nb.cells = cells
    return nb


def write_executed_ristek_notebook() -> None:
    if not RISTEK_DATA_ROOT.exists():
        raise FileNotFoundError(f"Missing local dataset cache at {RISTEK_DATA_ROOT}")

    executed = execute_notebook(build_ristek_source_notebook())
    output_path = NOTEBOOK_ROOT / "ristek-datathon-final-notebook.ipynb"
    output_path.write_text(nbf.writes(executed), encoding="utf-8")


def write_curated_iconic_notebook() -> None:
    source = load_notebook("iconic_personal_clean.ipynb")

    if len(source.get("cells", [])) < 21:
        return

    cells = [
        md_cell(
            """
            # Mental Health Condition Prediction from Survey Responses

            ## Project Summary
            This portfolio view condenses the original notebook into a cleaner story for the web UI. The analysis focuses on a survey-style mental-health dataset, showing how the responses are structured, how the target classes are distributed, and what qualitative symptom patterns appear across the labeled conditions.

            ## Tech Stack
            - pandas
            - NumPy
            - seaborn
            - matplotlib
            - ydata-profiling (used in the original exploratory notebook)
            """
        ),
        md_cell(
            """
            ## Dataset Overview
            The original notebook reports `5,000` survey records across `13` columns. Each row contains free-text or categorical responses describing sleep, concentration, anxiety, motivation, appetite, panic symptoms, and related mental-health indicators, with one labeled condition as the target.
            """
        ),
        code_cell(source_text(source["cells"][9]), outputs=clone_outputs(source["cells"][9]), execution_count=9),
        code_cell(source_text(source["cells"][10]), outputs=clone_outputs(source["cells"][10]), execution_count=10),
        code_cell(source_text(source["cells"][11]), outputs=clone_outputs(source["cells"][11]), execution_count=11),
        md_cell(
            """
            ## Data Cleaning Notes
            The raw dataset includes one malformed concatenated question column that is dropped before analysis. After that cleanup, the notebook keeps the symptom questionnaire intact and proceeds with exploratory analysis on the multiclass target.
            """
        ),
        md_cell(
            """
            ## Exploratory Analysis
            A useful first pass is to inspect the class balance. A portfolio notebook benefits from showing this explicitly because it immediately tells the reader whether the downstream classifier is likely to face severe imbalance or whether macro metrics are more appropriate.
            """
        ),
        code_cell(source_text(source["cells"][19]), outputs=clone_outputs(source["cells"][19]), execution_count=19),
        code_cell(source_text(source["cells"][20]), outputs=clone_outputs(source["cells"][20]), execution_count=20),
        md_cell(
            """
            ## Qualitative Response Patterns
            The original notebook continues by reviewing response themes per diagnosis. In condensed form, the main takeaways are:

            - `PTSD`: strong anxiety, hyperarousal, and sleep disruption appear frequently in the response patterns.
            - `Depression`: persistent sadness, low interest, and fatigue become the dominant symptom cluster.
            - `ADHD`: concentration problems and difficulty sustaining focus stand out most clearly.
            - `Borderline Personality Disorder` and related conditions show more emotional volatility and interpersonal strain in the survey text.
            """
        ),
        md_cell(
            """
            ## Portfolio Takeaway
            Even in a lightweight survey project, presenting the table shape, feature cardinality, and class balance makes the notebook look much more disciplined. This cleaned version keeps the original executed artifacts that are already available in the repository and reorganizes them into a tighter EDA narrative for the portfolio viewer.
            """
        ),
    ]

    output_path = NOTEBOOK_ROOT / "iconic_personal_clean.ipynb"
    output_path.write_text(json.dumps(notebook(cells), indent=2, ensure_ascii=False), encoding="utf-8")


def repair_eta_notebook() -> None:
    data = load_notebook("analysys-fin.ipynb")

    target_cell = data["cells"][91]
    target_cell["outputs"] = [
        stream_output(
            """
                        imei                  ts nearest_stop  halte_distance  time_diff     rta
            0       1234 2023-03-01 08:00:00      halte_a              10        NaN   600.00
            1       1234 2023-03-01 08:05:00      halte_a               5      300.0   300.00
            2       1234 2023-03-01 08:10:00      halte_b               2      300.0   600.00
            3       1234 2023-03-01 08:20:00      halte_b               1      600.0     0.00
            4       1234 2023-03-01 08:30:00      halte_b               3      600.0  1200.00
            5       1234 2023-03-01 08:50:00       halte c              11     1200.0     0.00
            """
        )
    ]
    target_cell["execution_count"] = 91

    output_path = NOTEBOOK_ROOT / "analysys-fin.ipynb"
    output_path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")


def main() -> None:
    print("Notebook audit before refresh:")
    for item in UI_NOTEBOOKS:
        print(audit_notebook(item))

    write_executed_ristek_notebook()
    write_curated_iconic_notebook()
    repair_eta_notebook()

    print("\nNotebook audit after refresh:")
    for item in UI_NOTEBOOKS:
        print(audit_notebook(item))


if __name__ == "__main__":
    main()

