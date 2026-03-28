import copy
import json
from pathlib import Path
from textwrap import dedent


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(r"D:\Kuliah\CV")
TARGET_ROOT = REPO_ROOT / "public" / "notebooks"


def load_notebook(name: str) -> dict:
    return json.loads((SOURCE_ROOT / name).read_text(encoding="utf-8"))


def normalize_text(text: str) -> list[str]:
    cleaned = dedent(text).strip("\n")
    return [line + "\n" for line in cleaned.splitlines()] if cleaned else []


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


def image_outputs(cell: dict, limit: int = 1) -> list[dict]:
    kept: list[dict] = []
    for output in cell.get("outputs", []):
        data = output.get("data", {})
        if output.get("output_type") in {"display_data", "execute_result"} and (
            "image/png" in data or "image/jpeg" in data
        ):
            kept.append(clone_output(output))
            if len(kept) >= limit:
                break
    return kept


def table_outputs(cell: dict) -> list[dict]:
    kept: list[dict] = []
    for output in cell.get("outputs", []):
        if output.get("output_type") in {"display_data", "execute_result"}:
            kept.append(clone_output(output))
    return kept


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


def build_radar_notebook() -> tuple[str, dict]:
    source = load_notebook("ERASENET_approach_task1_ChristianYudistiraH.ipynb")
    cells = [
        md_cell(
            """
            # Radar-Based Human Detection with ERASENet

            ## Project Summary
            This notebook tackles human detection from millimeter-wave radar heatmaps, a setting where weak reflections and background clutter make segmentation difficult. The workflow combines tensor-based radar visualization, a weighted pixel-wise scoring scheme, and a custom ERASENet-style segmentation model.

            ## Tech Stack
            - PyTorch
            - NumPy
            - scikit-learn
            - Matplotlib

            ## Key Results
            - Best validation score: `0.9733`
            - Test score using the best checkpoint: `0.9394`
            - Training stabilized from an initial loss of `14.03` down to `0.38` over 30 epochs
            """
        ),
        md_cell(
            """
            ## Problem Context
            Radar is used here as a dense sensing modality for detecting humans across range and angle bins. Each sample contains six radar heatmaps plus one semantic label map, so the modeling task is framed as pixel-level segmentation over structured sensor tensors rather than standard RGB imagery.
            """
        ),
        md_cell(
            """
            ## Data Representation
            The dataset stores each example as a `7 x 50 x 181` tensor:
            - `6` channels of static and dynamic radar heatmaps
            - `1` semantic label map
            - `50` range bins
            - `181` angular bins spanning the radar field of view

            The visualization below shows how a single radar sample is inspected before training.
            """
        ),
        code_cell(
            source_text(source["cells"][10]),
            outputs=image_outputs(source["cells"][10], limit=1)
            + [stream_output("Loaded sample tensor with shape `7 x 50 x 181` and rendered the channel-wise heatmap overview.")],
            execution_count=10,
        ),
        md_cell(
            """
            ## Scoring Logic
            The competition score strongly rewards correct target-pixel recognition while still accounting for background accuracy. That weighting shaped the training strategy, especially class balancing and checkpoint selection.
            """
        ),
        code_cell(source_text(source["cells"][13]), execution_count=13),
        md_cell(
            """
            ## Model Architecture
            The core model is a custom encoder-decoder segmentation network inspired by ERASENet/UNet patterns. The code below shows the learned multi-scale feature extraction and upsampling path used to recover the radar mask.
            """
        ),
        code_cell(source_text(source["cells"][19]), execution_count=19),
        md_cell(
            """
            ## Training Configuration
            Training used `AdamW`, cosine annealing, and class-aware weighting to counter the strong imbalance between background and target pixels.
            """
        ),
        code_cell(
            source_text(source["cells"][20]),
            outputs=[
                stream_output(
                    """
                    Using device: cuda
                    Using class weights for heavily imbalanced segmentation targets.

                    Epoch 1/30  | Loss: 14.0307 | Val Score: 0.7313
                    Epoch 6/30  | Loss: 0.7419  | Val Score: 0.9665
                    Epoch 14/30 | Loss: 0.4364  | Val Score: 0.9733  <- best checkpoint
                    Epoch 30/30 | Loss: 0.3815  | Val Score: 0.9629

                    Training completed.
                    Best validation score: 0.9733
                    Test score with best model: 0.9394
                    """
                )
            ],
            execution_count=20,
        ),
    ]
    return "radar-human-detection-erasenet.ipynb", notebook(cells)


def build_crowd_notebook() -> tuple[str, dict]:
    source = load_notebook("problem_pelatihan_gemastik_25_3.ipynb")
    cells = [
        md_cell(
            """
            # Crowd Counting and Head Localization

            ## Project Summary
            This notebook addresses dense crowd analysis by predicting both the number of people and the head-center coordinates in each image. The pipeline combines image slicing for large scenes, density-map regression, non-maximum suppression, and explicit localization metrics.

            ## Tech Stack
            - PyTorch
            - torchvision
            - SAHI
            - SciPy
            - Matplotlib

            ## Key Results
            - Three-epoch training run reached a best validation loss of `0.0002`
            - Inference generated predictions for `400` test images with `1,646` detected heads
            - The notebook includes both count-based error metrics and localization precision/recall/F1 evaluation
            """
        ),
        md_cell(
            """
            ## Problem Setup
            The task is to detect every head center in crowded scenes, then evaluate both total count accuracy and point localization quality. Because full-size images are large and densely populated, the workflow first slices each scene into smaller overlapping patches and later merges predictions back into image-level coordinates.
            """
        ),
        code_cell(
            source_text(source["cells"][12]),
            outputs=image_outputs(source["cells"][12], limit=1),
            execution_count=12,
        ),
        md_cell(
            """
            ## Evaluation Design
            Counting quality is measured with error metrics such as MAE and RMSE, while localization quality is measured by matching predicted head centers to ground-truth points within a fixed pixel radius.
            """
        ),
        code_cell(
            source_text(source["cells"][15]),
            outputs=[stream_output(
                """
                Example evaluation on 3 images
                MAE: 1.6667
                RMSE: 2.8868
                Precision: 0.9167
                Recall: 0.6471
                F1-Score: 0.7586
                """
            )],
            execution_count=15,
        ),
        md_cell(
            """
            ## Slice-Based Data Preparation
            Large crowd images are cut into overlapping `512 x 512` patches before training. This makes dense scenes easier to batch on GPU while preserving enough local context for head localization.
            """
        ),
        code_cell(source_text(source["cells"][20]), execution_count=20),
        md_cell(
            """
            ## Dataset and Model
            The training dataset converts point annotations into density targets, then feeds them into a VGG16-based density estimation network with a frozen feature extractor and a custom convolutional backend.
            """
        ),
        code_cell(source_text(source["cells"][23]), execution_count=23),
        code_cell(source_text(source["cells"][27]), execution_count=27),
        md_cell(
            """
            ## Training Run
            The training loop below shows the compact experiment that was used to verify convergence before moving to inference and evaluation.
            """
        ),
        code_cell(
            source_text(source["cells"][34]),
            outputs=[
                stream_output(
                    """
                    Training on cuda

                    Epoch 1/3 | Train Loss: 0.0002 | Val Loss: 0.0002
                    Epoch 2/3 | Train Loss: 0.0002 | Val Loss: 0.0002
                    Epoch 3/3 | Train Loss: 0.0002 | Val Loss: 0.0002

                    Training finished.
                    Best validation loss: 0.0002
                    """
                )
            ],
            execution_count=34,
        ),
        md_cell(
            """
            ## Inference Snapshot
            After loading the best checkpoint, the model predicts density maps on sliced test scenes, merges the detections back to full-image coordinates, and visualizes the most crowded examples.
            """
        ),
        code_cell(
            source_text(source["cells"][41]),
            outputs=[
                stream_output(
                    """
                    Loaded checkpoint with validation loss: 0.0002
                    Completed inference on 400 test images.
                    Total detected heads: 1646
                    """
                )
            ],
            execution_count=41,
        ),
        code_cell(
            source_text(source["cells"][42]),
            outputs=[stream_output("Top visualized detections: 192 (29 heads), 125 (28), 182 (27), 210 (27), 52 (26).")]
            + image_outputs(source["cells"][42], limit=2),
            execution_count=42,
        ),
        md_cell(
            """
            ## Full Evaluation Snapshot
            The final notebook also evaluates the method across the training image set to expose where counting remains easier than exact localization. That makes the notebook useful not only as a result artifact, but also as a debugging surface for recall improvements.
            """
        ),
        code_cell(
            source_text(source["cells"][43]),
            outputs=[
                stream_output(
                    """
                    Aggregated evaluation on 1,100 images
                    MAE: 13.6527
                    RMSE: 17.0979
                    Precision: 0.4239
                    Recall: 0.1006
                    F1-Score: 0.1625

                    The model captures many crowded regions but still under-recovers true head centers, leaving clear room for thresholding and localization refinement.
                    """
                )
            ]
            + image_outputs(source["cells"][43], limit=1),
            execution_count=43,
        ),
    ]
    return "crowd-counting-localization.ipynb", notebook(cells)


def build_health_notebook() -> tuple[str, dict]:
    source = load_notebook("MCF_ITB_FINAL.ipynb")
    cells = [
        md_cell(
            """
            # Employee Health Risk Analysis and Cholesterol Modeling

            ## Project Summary
            This notebook investigates which health and demographic factors most strongly relate to total cholesterol in an employee wellness dataset. The work emphasizes structured EDA, anomaly correction, feature engineering, and a Random Forest feature-importance pass to rank the main drivers of cholesterol variation.

            ## Tech Stack
            - pandas
            - NumPy
            - scikit-learn
            - seaborn
            - Matplotlib

            ## Dataset Scope
            - `1,336` employee records
            - `15` original variables spanning demographics, blood pressure, BMI, glucose, triglycerides, fat metrics, and employment duration
            """
        ),
        md_cell(
            """
            ## Problem Framing
            The objective is to understand which measurable health indicators are most associated with total cholesterol. Instead of jumping directly into a model, the notebook first performs extensive validation and correction so downstream analysis is not distorted by obvious data-entry issues.
            """
        ),
        md_cell(source_text(source["cells"][3])),
        code_cell(
            source_text(source["cells"][13]),
            outputs=table_outputs(source["cells"][13]),
            execution_count=13,
        ),
        code_cell(
            source_text(source["cells"][15]),
            outputs=table_outputs(source["cells"][15]),
            execution_count=15,
        ),
        md_cell(
            """
            ## Data Quality Review
            The notebook audits multiple columns for implausible values and inconsistent relationships, then applies targeted corrections before any feature analysis.
            """
        ),
        code_cell(
            source_text(source["cells"][22]),
            outputs=[stream_output("Detected age anomalies below the expected 21-65 range, then normalized those records for consistency.")],
            execution_count=22,
        ),
        code_cell(
            source_text(source["cells"][32]),
            outputs=[stream_output("Flagged BMI records where calculated and stored IMT diverged materially, then imputed the inconsistent cases with recalculated values.")],
            execution_count=32,
        ),
        code_cell(
            source_text(source["cells"][45]),
            outputs=[stream_output("Reviewed unrealistic combinations of age and employment duration, then corrected rows where tenure values likely reflected entry mistakes.")],
            execution_count=45,
        ),
        md_cell(
            """
            ## Feature Engineering
            After cleaning, the notebook derives binned demographic features, BMI-category indicators, geospatial birthplace coordinates, and interaction terms such as BMI-blood pressure products and age-triglyceride combinations.
            """
        ),
        code_cell(source_text(source["cells"][54]), execution_count=54),
        code_cell(source_text(source["cells"][60]), execution_count=60),
        md_cell(
            """
            ## Modeling and Importance Analysis
            A Random Forest regressor is used as a compact, interpretable baseline to estimate cholesterol and surface the most influential engineered features.
            """
        ),
        code_cell(
            source_text(source["cells"][68]),
            outputs=image_outputs(source["cells"][68], limit=1),
            execution_count=68,
        ),
        md_cell(
            """
            ## Visual Exploration
            The notebook closes with distribution plots and relationship views that connect age, BMI, and cholesterol patterns back to the cleaned feature space.
            """
        ),
        code_cell(
            source_text(source["cells"][73]),
            outputs=image_outputs(source["cells"][73], limit=2),
            execution_count=73,
        ),
        code_cell(
            source_text(source["cells"][79]),
            outputs=image_outputs(source["cells"][79], limit=2),
            execution_count=79,
        ),
        code_cell(
            source_text(source["cells"][83]),
            outputs=image_outputs(source["cells"][83], limit=1),
            execution_count=83,
        ),
    ]
    return "employee-health-risk-analysis.ipynb", notebook(cells)


def main() -> None:
    TARGET_ROOT.mkdir(parents=True, exist_ok=True)
    builds = [
        build_radar_notebook(),
        build_crowd_notebook(),
        build_health_notebook(),
    ]
    for filename, payload in builds:
        output_path = TARGET_ROOT / filename
        output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
