import React, { useState } from "react";
import {
  AlertCircle,
  Mail,
  Lock,
  User,
  Github,
  Facebook,
  Twitter,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ErrorBar,
} from "recharts";

const ModelPerformanceDashboard = () => {
  // Add size bracket calculation
  const getSizeBracket = (model) => {
    if (!model || !model.full_name) {
      // Try to get size from variant if model name is not available
      return "Unknown";
    }

    const match = model.full_name.match(/(\d+)[bB]/);
    if (!match) {
      console.warn(
        `Could not extract parameter count from model name: ${model.full_name}`,
      );
      return "Unknown";
    }

    const paramCount = parseInt(match[1]);
    if (paramCount <= 4) return "Small (1-4B)";
    if (paramCount <= 15) return "Medium (5-15B)";
    if (paramCount <= 36) return "Large (16-35B)";
    return "Extra Large (>35B)";
  };

  // Hard-code the JSON data
  const jsonData = {
    datasets: [
      {
        id: "dataset1",
        description: "G1 reasoning/CoT benchmark suite",
        data: {
          metadata: {
            benchmark_feature: "g1 reasoning/CoT",
            frontend: "open webui",
            backend: "LMStudio",
            timestamp: "2024-11-16T15:36:31",
          },
          models: [
            {
              model_id: "mistral-small-22b",
              base_name: "mistral",
              full_name: "mistral-small-22b",
              architecture_family: "mistral",
              organisations: ["Mistral AI"],
            },
            {
              model_id: "gemma-2-27b",
              base_name: "gemma",
              full_name: "gemma-2-27b",
              architecture_family: "gemma",
              organisations: ["Google"],
            },
            {
              model_id: "qwen2.5-32b",
              base_name: "qwen",
              full_name: "qwen2.5-32b",
              architecture_family: "qwen",
              organisations: ["Alibaba"],
            },
            {
              model_id: "c4ai-command-r-35b",
              base_name: "c4ai",
              full_name: "c4ai-command-r-35b",
              architecture_family: "command",
              organisations: ["C4AI"],
            },
            {
              model_id: "mistral-nemo-12b",
              base_name: "mistral",
              full_name: "mistral-nemo-12b",
              architecture_family: "mistral",
              organisations: ["Mistral AI", "NVIDIA"],
            },
            {
              model_id: "noushermes-mixtral",
              base_name: "mixtral",
              full_name: "noushermes-mixtral-8x7b-reddit",
              architecture_family: "mixtral",
              variant_qualifiers: ["reddit"],
            },
            {
              model_id: "llama-3",
              base_name: "llama",
              full_name: "llama-3.2-3b-instruct",
              architecture_family: "llama",
              organisations: ["Meta"],
              variant_qualifiers: ["instruct"],
            },
          ],
          variants: [
            {
              variant_id: "mistral-small-22b-4bit",
              base_model_id: "mistral-small-22b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 12.52,
              full_variant_name: "mistral-small-22b-4bit",
            },
            {
              variant_id: "mistral-small-22b-8bit",
              base_model_id: "mistral-small-22b",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 23.64,
              full_variant_name: "mistral-small-22b-8bit",
            },
            {
              variant_id: "gemma-2-27b-4bit",
              base_model_id: "gemma-2-27b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 15.36,
              full_variant_name: "gemma-2-27b-4bit",
            },
            {
              variant_id: "gemma-2-27b-8bit",
              base_model_id: "gemma-2-27b",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 28.97,
              full_variant_name: "gemma-2-27b-8bit",
            },
            {
              variant_id: "qwen2.5-32b-8bit",
              base_model_id: "qwen2.5-32b",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 34.82,
              full_variant_name: "qwen2.5-32b-8bit",
            },
            {
              variant_id: "qwen2.5-32b-4bit",
              base_model_id: "qwen2.5-32b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 18.44,
              full_variant_name: "qwen2.5-32b-4bit",
            },
            {
              variant_id: "c4ai-command-r-35b-08-2024-4bit",
              base_model_id: "c4ai-command-r-35b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 18.18,
              full_variant_name: "c4ai-command-r-35b-08-2024-4bit",
            },
            {
              variant_id: "c4ai-command-r-35b-08-2024-8bit",
              base_model_id: "c4ai-command-r-35b",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 34.33,
              full_variant_name: "c4ai-command-r-35b-08-2024-8bit",
            },
            {
              variant_id: "c4ai-command-r-35b-v01-4bit",
              base_model_id: "c4ai-command-r-35b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 22.7,
              full_variant_name: "c4ai-command-r-35b-v01-4bit",
            },
            {
              variant_id: "mistral-nemo-12b-instruct-2407-4bit",
              base_model_id: "mistral-nemo-12b",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 6.91,
              full_variant_name: "mistral-nemo-12b-instruct-2407-4bit",
            },
            {
              variant_id: "mistral-nemo-12b-instruct-2407-8bit",
              base_model_id: "mistral-nemo-12b",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 13.03,
              full_variant_name: "mistral-nemo-12b-instruct-2407-8bit",
            },
            {
              variant_id: "mistral-nemo-12b-instruct-2407-bf16",
              base_model_id: "mistral-nemo-12b",
              framework: "MLX",
              quantization: "bf16",
              size_gb: 24.51,
              full_variant_name: "mistral-nemo-12b-instruct-2407-bf16",
            },
            {
              variant_id: "noushermes-mixtral-8x7b-reddit-mlx",
              base_model_id: "noushermes-mixtral",
              framework: "MLX",
              quantization: "bf16",
              size_gb: 26.65,
              full_variant_name: "noushermes-mixtral-8x7b-reddit-mlx",
            },
            {
              variant_id: "llama-3.1-nemotron-70b-instruct-hf",
              base_model_id: "llama-3",
              framework: "MLX",
              quantization: "bf16",
              size_gb: 42.52,
              full_variant_name: "llama-3.1-nemotron-70b-instruct-hf",
            },
            {
              variant_id: "reflection-70b-q4-K-M-gguf",
              base_model_id: "llama-3",
              framework: "GGUF",
              quantization: "q4.K.M",
              size_gb: 42.52,
              full_variant_name: "reflection-70b-q4-K-M.gguf",
            },
            {
              variant_id: "llama-3.2-3b-instruct-4bit",
              base_model_id: "llama-3",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 1.82,
              full_variant_name: "llama-3.2-3b-instruct-4bit",
            },
            {
              variant_id: "llama-3.2-3b-instruct-8bit",
              base_model_id: "llama-3",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 3.42,
              full_variant_name: "llama-3.2-3b-instruct-8bit",
            },
            {
              variant_id: "llama-3.2-3b-instruct-fp16",
              base_model_id: "llama-3",
              framework: "GGUF",
              quantization: "fp16",
              size_gb: 6.43,
              full_variant_name: "llama-3.2-3b-instruct-fp16",
            },
          ],
          runs: [
            {
              run_id: 1,
              sequence_id: 1,
              variant_id: "mistral-small-22b-4bit",
              tokens_per_second: 22.48,
              total_tokens: 1044,
              total_time_seconds: 46.44,
              status: "success",
            },
            {
              run_id: 2,
              sequence_id: 2,
              variant_id: "mistral-small-22b-8bit",
              tokens_per_second: 15.8,
              total_tokens: 1378,
              total_time_seconds: 87.19,
              status: "success",
            },
            {
              run_id: 3,
              sequence_id: 3,
              variant_id: "gemma-2-27b-4bit",
              tokens_per_second: 15.08,
              total_tokens: 772,
              total_time_seconds: 51.18,
              status: "success",
            },
            {
              run_id: 4,
              sequence_id: 4,
              variant_id: "gemma-2-27b-8bit",
              tokens_per_second: 11.6,
              total_tokens: 810,
              total_time_seconds: 69.82,
              status: "success",
            },
            {
              run_id: 5,
              sequence_id: 5,
              variant_id: "qwen2.5-32b-8bit",
              tokens_per_second: 13.24,
              total_tokens: 1033,
              total_time_seconds: 78.03,
              status: "success",
            },
            {
              run_id: 6,
              sequence_id: 6,
              variant_id: "qwen2.5-32b-4bit",
              tokens_per_second: 19.24,
              total_tokens: 676,
              total_time_seconds: 35.14,
              status: "success",
            },
            {
              run_id: 7,
              sequence_id: 7,
              variant_id: "c4ai-command-r-35b-08-2024-4bit",
              tokens_per_second: 21.4,
              total_tokens: 491,
              total_time_seconds: 22.94,
              status: "success",
            },
            {
              run_id: 8,
              sequence_id: 8,
              variant_id: "c4ai-command-r-35b-08-2024-8bit",
              tokens_per_second: 14.44,
              total_tokens: 1311,
              total_time_seconds: 90.8,
              status: "success",
            },
            {
              run_id: 9,
              sequence_id: 9,
              variant_id: "c4ai-command-r-plus-104b-2bit",
              tokens_per_second: null,
              total_tokens: null,
              total_time_seconds: null,
              status: "failed",
            },
            {
              run_id: 10,
              sequence_id: 10,
              variant_id: "c4ai-command-r-35b-v01-4bit",
              tokens_per_second: 19.06,
              total_tokens: 655,
              total_time_seconds: 34.37,
              status: "success",
            },
            {
              run_id: 11,
              sequence_id: 11,
              variant_id: "mistral-nemo-12b-instruct-2407-4bit",
              tokens_per_second: 46.36,
              total_tokens: 761,
              total_time_seconds: 16.41,
              status: "success",
            },
            {
              run_id: 12,
              sequence_id: 12,
              variant_id: "mistral-nemo-12b-instruct-2407-8bit",
              tokens_per_second: 32.38,
              total_tokens: 1223,
              total_time_seconds: 37.77,
              status: "success",
            },
            {
              run_id: 13,
              sequence_id: 13,
              variant_id: "mistral-nemo-12b-instruct-2407-bf16",
              tokens_per_second: 18.17,
              total_tokens: 758,
              total_time_seconds: 41.71,
              status: "success",
            },
            {
              run_id: 14,
              sequence_id: 14,
              variant_id: "noushermes-mixtral-8x7b-reddit-mlx",
              tokens_per_second: 28.28,
              total_tokens: 672,
              total_time_seconds: 23.76,
              status: "success",
            },
            {
              run_id: 15,
              sequence_id: 15,
              variant_id: "llama-3.1-nemotron-70b-instruct-hf",
              tokens_per_second: 10.78,
              total_tokens: 908,
              total_time_seconds: 84.23,
              status: "success",
            },
            {
              run_id: 16,
              sequence_id: 16,
              variant_id: "reflection-70b-q4-K-M-gguf",
              tokens_per_second: 7.02,
              total_tokens: 1469,
              total_time_seconds: 209.17,
              status: "success",
            },
            {
              run_id: 17,
              sequence_id: 17,
              variant_id: "llama-3.2-3b-instruct-4bit",
              tokens_per_second: 71.39,
              total_tokens: 929,
              total_time_seconds: 13.01,
              status: "success",
            },
            {
              run_id: 18,
              sequence_id: 18,
              variant_id: "llama-3.2-3b-instruct-8bit",
              tokens_per_second: 70.97,
              total_tokens: 836,
              total_time_seconds: 11.78,
              status: "success",
            },
            {
              run_id: 19,
              sequence_id: 19,
              variant_id: "llama-3.2-3b-instruct-fp16",
              tokens_per_second: 52.99,
              total_tokens: 634,
              total_time_seconds: 11.96,
              status: "success",
            },
          ],
          gguf_debug: {
            "16": {
              run_id: 16,
              load_time_ms: 23700.77,
              prompt_eval_time_ms: 61164.08,
              prompt_tokens: 2277,
              eval_time_ms: 0.0,
              eval_runs: 1,
              total_time_ms: 61168.33,
              total_tokens: 2278,
            },
          },
        },
      },
      {
        id: "dataset2",
        description: "Llama 3.1 Nemotron comparison study",
        data: {
          metadata: {
            benchmark_feature: "llama-3.1-nemotron-70b comparison",
            frontend: "open webui",
            backend: "LMStudio",
            timestamp: "2024-11-15T15:49:13",
          },
          models: [
            {
              model_id: "llama-3.1-nemotron-70b",
              base_name: "llama",
              full_name: "llama-3.1-nemotron-70b",
              architecture_family: "llama",
              organisations: ["Meta", "Nemotron"],
              variant_qualifiers: ["instruct"],
            },
            {
              model_id: "nvidia-llama-3.1-nemotron-70b",
              base_name: "llama",
              full_name: "nvidia_llama-3.1-nemotron-70b-instruct",
              architecture_family: "llama",
              organisations: ["Meta", "Nemotron", "NVIDIA"],
              variant_qualifiers: ["instruct"],
            },
          ],
          variants: [
            {
              variant_id: "llama-3.1-nemotron-70b-hf",
              base_model_id: "llama-3.1-nemotron-70b",
              framework: "MLX",
              quantization: "bf16",
              size_gb: 39.71,
              full_variant_name: "llama-3.1-nemotron-70b-hf",
            },
            {
              variant_id: "llama-3.1-nemotron-70b-instruct-k-m-gguf",
              base_model_id: "llama-3.1-nemotron-70b",
              framework: "GGUF",
              quantization: "q4.K.M",
              size_gb: 42.52,
              full_variant_name: "llama-3.1-nemotron-70b-instruct-k-m.gguf",
            },
            {
              variant_id: "nvidia-llama-3.1-nemotron-70b-instruct-hf",
              base_model_id: "nvidia-llama-3.1-nemotron-70b",
              framework: "MLX",
              quantization: "bf16",
              size_gb: 39.7,
              full_variant_name: "nvidia_llama-3.1-nemotron-70b-instruct-hf",
            },
          ],
          runs: [
            {
              run_id: 1,
              sequence_id: 1,
              variant_id: "llama-3.1-nemotron-70b-hf",
              tokens_per_second: 6.49,
              total_tokens: 448,
              total_time_seconds: 69.0,
              status: "success",
              mlx_debug: {
                prompt_tokens: 2085,
                completion_tokens: 265,
                total_tokens: 2350,
              },
            },
            {
              run_id: 2,
              sequence_id: 2,
              variant_id: "llama-3.1-nemotron-70b-instruct-k-m-gguf",
              tokens_per_second: 4.81,
              total_tokens: 848,
              total_time_seconds: 176.2,
              status: "success",
            },
            {
              run_id: 3,
              sequence_id: 3,
              variant_id: "llama-3.1-nemotron-70b-instruct-k-m-gguf",
              tokens_per_second: 6.63,
              total_tokens: 865,
              total_time_seconds: 130.55,
              status: "success",
            },
            {
              run_id: 4,
              sequence_id: 4,
              variant_id: "nvidia-llama-3.1-nemotron-70b-instruct-hf",
              tokens_per_second: 7.08,
              total_tokens: 448,
              total_time_seconds: 63.32,
              status: "success",
              mlx_debug: {
                prompt_tokens: 2085,
                completion_tokens: 37,
                total_tokens: 2122,
              },
            },
          ],
          gguf_debug: {
            "2": {
              run_id: 2,
              load_time_ms: 22470.62,
              prompt_eval_time_ms: 56327.61,
              prompt_tokens: 2085,
              eval_time_ms: 1744.64,
              eval_runs: 12,
              total_time_ms: 58082.25,
              total_tokens: 2097,
            },
            "3": {
              run_id: 3,
              load_time_ms: 1844.56,
              prompt_eval_time_ms: 36433.25,
              prompt_tokens: 2085,
              eval_time_ms: 435.86,
              eval_runs: 4,
              total_time_ms: 36875.61,
              total_tokens: 2089,
            },
          },
        },
      },
      {
        id: "dataset3",
        description: "Long context assessment study",
        data: {
          metadata: {
            benchmark_feature: "long context g1 reasoning/CoT",
            frontend: "open webui",
            backend: "LMStudio",
            timestamp: "2024-11-16T18:27:08",
            additional_info: {
              input_size: "64915 characters",
              mlx_ram_usage: "52GB",
            },
          },
          models: [
            {
              model_id: "llama-3.2-3b-instruct",
              base_name: "llama",
              full_name: "llama-3.2-3b-instruct",
              architecture_family: "llama",
              organisations: ["Meta"],
              variant_qualifiers: ["instruct"],
            },
          ],
          variants: [
            {
              variant_id: "llama-3.2-3b-instruct-4bit",
              base_model_id: "llama-3",
              framework: "MLX",
              quantization: "4bit",
              size_gb: 1.82,
              full_variant_name: "llama-3.2-3b-instruct-4bit",
            },
            {
              variant_id: "llama-3.2-3b-instruct-8bit",
              base_model_id: "llama-3",
              framework: "MLX",
              quantization: "8bit",
              size_gb: 3.42,
              full_variant_name: "llama-3.2-3b-instruct-8bit",
            },
            {
              variant_id: "llama-3.2-3b-instruct-fp16",
              base_model_id: "llama-3",
              framework: "GGUF",
              quantization: "fp16",
              size_gb: 6.43,
              full_variant_name: "llama-3.2-3b-instruct-fp16",
            },
            {
              variant_id: "llama-3.2-3b-instruct-q4km-gguf",
              base_model_id: "llama-3.2-3b-instruct",
              framework: "GGUF",
              quantization: "q4.K.M",
              size_gb: 2.02,
              full_variant_name: "llama-3.2-3b-instruct-q4km-gguf",
            },
            {
              variant_id: "llama-3.2-3b-instruct-q6k-gguf",
              base_model_id: "llama-3.2-3b-instruct",
              framework: "GGUF",
              quantization: "q6.K",
              size_gb: 2.64,
              full_variant_name: "llama-3.2-3b-instruct-q6k-gguf",
            },
            {
              variant_id: "llama-3.2-3b-instruct-q8-gguf",
              base_model_id: "llama-3.2-3b-instruct",
              framework: "GGUF",
              quantization: "q8_0",
              size_gb: 3.42,
              full_variant_name: "llama-3.2-3b-instruct-q8-gguf",
            },
            {
              variant_id: "llama-3.2-3b-instruct-fp16-gguf",
              base_model_id: "llama-3.2-3b-instruct",
              framework: "GGUF",
              quantization: "fp16",
              size_gb: 6.43,
              full_variant_name: "llama-3.2-3b-instruct-fp16-gguf",
            },
          ],
          runs: [
            {
              run_id: 1,
              sequence_id: 1,
              variant_id: "llama-3.2-3b-instruct-4bit",
              tokens_per_second: 11.23,
              total_tokens: 549,
              total_time_seconds: 48.9,
              status: "success",
              additional_info: {
                prompt_processing: "97s",
              },
            },
            {
              run_id: 2,
              sequence_id: 2,
              variant_id: "llama-3.2-3b-instruct-8bit",
              tokens_per_second: 10.6,
              total_tokens: 517,
              total_time_seconds: 48.78,
              status: "success",
              additional_info: {
                prompt_processing: "106s",
              },
            },
            {
              run_id: 3,
              sequence_id: 3,
              variant_id: "llama-3.2-3b-instruct-fp16-mlx",
              tokens_per_second: 9.73,
              total_tokens: 632,
              total_time_seconds: 64.94,
              status: "success",
              additional_info: {
                prompt_processing: "263s",
              },
            },
            {
              run_id: 4,
              sequence_id: 4,
              variant_id: "llama-3.2-3b-instruct-q4km-gguf",
              tokens_per_second: 9.08,
              total_tokens: 418,
              total_time_seconds: 46.05,
              status: "success",
            },
            {
              run_id: 5,
              sequence_id: 5,
              variant_id: "llama-3.2-3b-instruct-q6k-gguf",
              tokens_per_second: 9.47,
              total_tokens: 456,
              total_time_seconds: 48.16,
              status: "success",
            },
            {
              run_id: 6,
              sequence_id: 6,
              variant_id: "llama-3.2-3b-instruct-q8-gguf",
              tokens_per_second: 13.26,
              total_tokens: 747,
              total_time_seconds: 56.35,
              status: "success",
            },
            {
              run_id: 7,
              sequence_id: 7,
              variant_id: "llama-3.2-3b-instruct-fp16-gguf",
              tokens_per_second: 8.04,
              total_tokens: 333,
              total_time_seconds: 41.4,
              status: "success",
            },
          ],
          gguf_debug: {
            "4": {
              run_id: 4,
              load_time_ms: 4718.09,
              prompt_eval_time_ms: 94707.65,
              prompt_tokens: 42813,
              eval_time_ms: 41747.35,
              eval_runs: 718,
              total_time_ms: 136740.28,
              total_tokens: 43531,
            },
            "5": {
              run_id: 5,
              load_time_ms: 2986.1,
              prompt_eval_time_ms: 96221.35,
              prompt_tokens: 42813,
              eval_time_ms: 31088.85,
              eval_runs: 495,
              total_time_ms: 128517.12,
              total_tokens: 43308,
            },
            "6": {
              run_id: 6,
              load_time_ms: 3333.22,
              prompt_eval_time_ms: 91154.23,
              prompt_tokens: 42813,
              eval_time_ms: 32795.54,
              eval_runs: 541,
              total_time_ms: 124718.99,
              total_tokens: 43354,
            },
            "7": {
              run_id: 7,
              load_time_ms: 4365.53,
              prompt_eval_time_ms: 88270.03,
              prompt_tokens: 42813,
              eval_time_ms: 54225.61,
              eval_runs: 832,
              total_time_ms: 143031.24,
              total_tokens: 43645,
            },
          },
        },
      },
      {
        id: "dataset4",
        description: "g1-reasoning-CoT-cross-family-comparison-round-2",
        metadata: {
          benchmark_feature: "g1 reasoning/CoT",
          frontend: "open webui",
          backend: "LMStudio",
          timestamp: "2024-11-17T00:00:00",
        },
        models: [
          {
            model_id: "gemma-2-27b",
            base_name: "gemma",
            full_name: "gemma-2-27b",
            architecture_family: "gemma",
            organisations: ["Google"],
            variant_qualifiers: ["it"],
          },
          {
            model_id: "qwen2.5-14b",
            base_name: "qwen",
            full_name: "qwen2.5-14b",
            architecture_family: "qwen",
            organisations: ["Alibaba"],
            variant_qualifiers: ["Instruct"],
          },
          {
            model_id: "gemma-2-9b",
            base_name: "gemma",
            full_name: "gemma-2-9b",
            architecture_family: "gemma",
            organisations: ["Google"],
          },
          {
            model_id: "llama-3.1-8b",
            base_name: "llama",
            full_name: "llama-3.1-8B",
            architecture_family: "llama",
            organisations: ["Meta"],
          },
          {
            model_id: "ministral-8b",
            base_name: "ministral",
            full_name: "ministral-8b",
            architecture_family: "ministral",
            organisations: ["Mistral AI"],
          },
          {
            model_id: "qwen2.5-7b",
            base_name: "qwen",
            full_name: "qwen2.5-7b",
            architecture_family: "qwen",
            organisations: ["Alibaba"],
            variant_qualifiers: ["Instruct-Uncensored"],
          },
          {
            model_id: "aya-expanse-8b",
            base_name: "aya-expanse",
            full_name: "aya-expanse-8b",
            architecture_family: "aya-expanse",
            organisations: ["Aya Expanse"],
          },
          {
            model_id: "deepseek-coder-v2-lite",
            base_name: "Deepseek-Coder-V2-Lite",
            full_name: "DeepSeek-Coder-V2-Lite",
            architecture_family: "Deepseek",
            organisations: ["Deepseek"],
          },
          {
            model_id: "llama-3-8b",
            base_name: "llama",
            full_name: "llama-3-8B",
            architecture_family: "llama",
            organisations: ["Meta"],
          },
          {
            model_id: "mistral-7b",
            base_name: "mistral",
            full_name: "Mistral-7b",
            architecture_family: "mistral",
            organisations: ["Mistral AI"],
          },
        ],
        variants: [
          {
            variant_id: "gemma-2-27b-it-4bit",
            base_model_id: "gemma-2-27b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 15.33,
            full_variant_name: "gemma-2-27b-it-4bit",
          },
          {
            variant_id: "gemma-2-27b-it-8bit",
            base_model_id: "gemma-2-27b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 28.95,
            full_variant_name: "gemma-2-27b-it-8bit",
          },
          {
            variant_id: "gemma-2-27b-it-bf16-4bit",
            base_model_id: "gemma-2-27b",
            framework: "MLX",
            quantization: "bf16-4bit",
            size_gb: 15.36,
            full_variant_name: "gemma-2-27b-it-bf16-4bit",
          },
          {
            variant_id: "gemma-2-27b-it-bf16-8bit",
            base_model_id: "gemma-2-27b",
            framework: "MLX",
            quantization: "bf16-8bit",
            size_gb: 28.97,
            full_variant_name: "gemma-2-27b-it-bf16-8bit",
          },
          {
            variant_id: "qwen2.5-14b-instruct-4bit",
            base_model_id: "qwen2.5-14b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 8.32,
            full_variant_name: "Qwen2.5-14B-Instruct-4bit",
          },
          {
            variant_id: "qwen2.5-14b-instruct-8bit",
            base_model_id: "qwen2.5-14b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 15.71,
            full_variant_name: "Qwen2.5-14B-Instruct-8bit",
          },
          {
            variant_id: "qwen2.5-14b-instruct-bf16",
            base_model_id: "qwen2.5-14b",
            framework: "MLX",
            quantization: "bf16",
            size_gb: 29.55,
            full_variant_name: "Qwen2.5-14B-Instruct-bf16",
          },
          {
            variant_id: "gemma-2-9b-it-sppo-iter3-4bit",
            base_model_id: "gemma-2-9b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 5.22,
            full_variant_name: "Gemma-2-9B-It-SPPO-Iter3-4bit",
          },
          {
            variant_id: "gemma-2-9b-it-4bit",
            base_model_id: "gemma-2-9b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 5.22,
            full_variant_name: "gemma-2-9b-it-4bit",
          },
          {
            variant_id: "gemma-2-9b-it-8bit",
            base_model_id: "gemma-2-9b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 9.84,
            full_variant_name: "gemma-2-9b-it-8bit",
          },
          {
            variant_id: "gemma-2-9b-it-fp16",
            base_model_id: "gemma-2-9b",
            framework: "MLX",
            quantization: "fp16",
            size_gb: 18.5,
            full_variant_name: "gemma-2-9b-it-fp16",
          },
          {
            variant_id: "qwen2.5-7b-instruct-uncensored-4bit",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.3,
            full_variant_name: "Qwen2.5-7B-Instruct-Uncensored-4bit",
          },
          {
            variant_id: "qwen2.5-7b-instruct-4bit",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.3,
            full_variant_name: "Qwen2.5-7B-Instruct-4bit",
          },
          {
            variant_id: "qwen2.5-7b-instruct-8bit",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 8.1,
            full_variant_name: "Qwen2.5-7B-Instruct-8bit",
          },
          {
            variant_id: "qwen2.5-7b-instruct-bf16",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "bf16",
            size_gb: 15.24,
            full_variant_name: "Qwen2.5-7B-Instruct-bf16",
          },
          {
            variant_id: "qwen2.5-7b-abliterated-v2-4bit",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.3,
            full_variant_name:
              "Josiefied-Qwen2.5-7B-Instruct-abliterated-v2-4-bit",
          },
          {
            variant_id: "qwen2.5-7b-abliterated-v2-8bit",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 8.1,
            full_variant_name:
              "Josiefied-Qwen2.5-7B-Instruct-abliterated-v2-8-bit",
          },
          {
            variant_id: "qwen2.5-7b-abliterated-v2",
            base_model_id: "qwen2.5-7b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 15.24,
            full_variant_name: "Josiefied-Qwen2.5-7B-Instruct-abliterated-v2",
          },
          {
            variant_id: "aya-expanse-8b-4bit",
            base_model_id: "aya-expanse-8b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.54,
            full_variant_name: "aya-expanse-8b-4bit",
          },
          {
            variant_id: "deepseek-coder-v2-lite-instruct-8bit",
            base_model_id: "deepseek-coder-v2-lite",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 16.7,
            full_variant_name: "DeepSeek-Coder-V2-Lite-Instruct-8bit",
          },
          {
            variant_id: "deepseek-coder-v2-lite-instruct-4bit-mlx",
            base_model_id: "deepseek-coder-v2-lite",
            framework: "MLX",
            quantization: "4bit-mlx",
            size_gb: 8.84,
            full_variant_name: "DeepSeek-Coder-V2-Lite-Instruct-4bit-mlx",
          },
          {
            variant_id: "llama-3-8b-instruct-4bit",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 5.28,
            full_variant_name: "mlx-community/Meta-Llama-3-8B-Instruct-4bit",
          },
          {
            variant_id: "llama-3-8b-instruct-8bit",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 9.03,
            full_variant_name: "mlx-community/Meta-Llama-3-8B-Instruct-8bit",
          },
          {
            variant_id: "llama-3-8b-instruct",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 16.07,
            full_variant_name: "mlx-community/Meta-Llama-3-8B-Instruct",
          },
          {
            variant_id: "llama-3-groq-8b-tool-use-4bit",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.53,
            full_variant_name: "mlx-community/Llama-3-Groq-8B-Tool-Use-4bit",
          },
          {
            variant_id: "llama-3-groq-8b-tool-use-8bit",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 8.54,
            full_variant_name: "mlx-community/Llama-3-Groq-8B-Tool-Use-8bit",
          },
          {
            variant_id: "llama-3-groq-8b-tool-use-bf16",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "bf16",
            size_gb: 16.07,
            full_variant_name: "mlx-community/Llama-3-Groq-8B-Tool-Use-bf16",
          },
          {
            variant_id: "llama-3-8b-instruct-1048k-8bit",
            base_model_id: "llama-3-8b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 8.54,
            full_variant_name: "mlx-community/Llama-3-8B-Instruct-1048k-8bit",
          },
          {
            variant_id: "mistral-7b-instruct-v0.2-4bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.26,
            full_variant_name: "Mistral-7B-Instruct-v0.2-4bit",
          },
          {
            variant_id: "mistral-7b-instruct-v0.2-8bit-mlx",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 7.82,
            full_variant_name: "Mistral-7B-Instruct-v0.2-8-bit-mlx",
          },
          {
            variant_id: "mistral-7b-instruct-v0.3-4bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.08,
            full_variant_name: "Mistral-7B-Instruct-v0.3-4bit",
          },
          {
            variant_id: "mistral-7b-instruct-v0.3-8bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 7.7,
            full_variant_name: "Mistral-7B-Instruct-v0.3-8bit",
          },
          {
            variant_id: "mistral-7b-instruct-v0.3",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 14.5,
            full_variant_name: "Mistral-7B-Instruct-v0.3",
          },
          {
            variant_id: "mistral-nemo-minitron-8b-instruct-4bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.74,
            full_variant_name: "Mistral-NeMo-Minitron-8B-Instruct-4bit",
          },
          {
            variant_id: "mistral-nemo-minitron-8b-instruct-8bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 8.95,
            full_variant_name: "Mistral-NeMo-Minitron-8B-Instruct-8bit",
          },
          {
            variant_id: "mistral-nemo-minitron-8b-instruct",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 16.84,
            full_variant_name: "Mistral-NeMo-Minitron-8B-Instruct",
          },
          {
            variant_id: "mistral-7b-hermes-2-pro-instruct-8bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "8bit",
            size_gb: 7.82,
            full_variant_name: "Hermes-2-Pro-Mistral-7B-8bit",
          },
          {
            variant_id: "mistral-7b-openhermes-2.5-4bit-mlx",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit-mlx",
            size_gb: 4.26,
            full_variant_name: "OpenHermes-2.5-Mistral-7B-4bit-mlx",
          },
          {
            variant_id: "mistral-7b-nous-hermes-2-dpo-4bit-mlx",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit-mlx",
            size_gb: 4.26,
            full_variant_name: "Nous-Hermes-2-Mistral-7B-DPO-4bit-MLX",
          },
          {
            variant_id: "mistral-7b-heimers-2-pro-instruct-4bit",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit",
            size_gb: 4.27,
            full_variant_name: "Hermes-2-Pro-Mistral-7B-4bit",
          },
          {
            variant_id: "mistral7b-pairrm-sppo-iter3-unquantized",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 14.49,
            full_variant_name: "Mistral7B-PairRM-SPPO-Iter3-unquantized",
          },
          {
            variant_id:
              "mistral7b-inst-v0.2-4bit-mlx-distilabel-capybara-dpo-7k",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "4bit-mlx",
            size_gb: 12.09,
            full_variant_name:
              "Mistral7B-Inst-v0.2-4bit-mlx-distilabel-capybara-dpo-7k",
          },
          {
            variant_id: "capybarahermes-2.5-mistral-7b",
            base_model_id: "mistral-7b",
            framework: "MLX",
            quantization: "unquantized",
            size_gb: 24.73,
            full_variant_name: "CapybaraHermes-2.5-Mistral-7B",
          },
        ],
        runs: [
          {
            run_id: 1,
            sequence_id: 1,
            variant_id: "gemma-2-27b-it-4bit",
            tokens_per_second: 19.33,
            total_tokens: 757,
            total_time_seconds: 39.17,
            status: "success",
          },
          {
            run_id: 2,
            sequence_id: 2,
            variant_id: "gemma-2-27b-it-8bit",
            tokens_per_second: 13.77,
            total_tokens: 904,
            total_time_seconds: 65.64,
            status: "success",
          },
          {
            run_id: 3,
            sequence_id: 3,
            variant_id: "gemma-2-27b-it-bf16-4bit",
            tokens_per_second: 15.06,
            total_tokens: 569,
            total_time_seconds: 37.79,
            status: "success",
          },
          {
            run_id: 4,
            sequence_id: 4,
            variant_id: "gemma-2-27b-it-bf16-8bit",
            tokens_per_second: 12.06,
            total_tokens: 798,
            total_time_seconds: 66.19,
            status: "success",
          },
          {
            run_id: 5,
            sequence_id: 1,
            variant_id: "qwen2.5-14b-instruct-4bit",
            tokens_per_second: 35.97,
            total_tokens: 1361,
            total_time_seconds: 37.84,
            status: "success",
          },
          {
            run_id: 6,
            sequence_id: 2,
            variant_id: "qwen2.5-14b-instruct-8bit",
            tokens_per_second: 25.68,
            total_tokens: 849,
            total_time_seconds: 33.06,
            status: "success",
          },
          {
            run_id: 7,
            sequence_id: 3,
            variant_id: "qwen2.5-14b-instruct-bf16",
            tokens_per_second: 14.56,
            total_tokens: 1343,
            total_time_seconds: 92.25,
            status: "success",
          },
          {
            run_id: 8,
            sequence_id: 1,
            variant_id: "gemma-2-9b-it-sppo-iter3-4bit",
            tokens_per_second: 11.27,
            total_tokens: 771,
            total_time_seconds: 68.39,
            status: "success",
          },
          {
            run_id: 9,
            sequence_id: 2,
            variant_id: "gemma-2-9b-it-4bit",
            tokens_per_second: 12.64,
            total_tokens: 811,
            total_time_seconds: 64.18,
            status: "success",
          },
          {
            run_id: 10,
            sequence_id: 3,
            variant_id: "gemma-2-9b-it-8bit",
            tokens_per_second: 12.05,
            total_tokens: 520,
            total_time_seconds: 43.15,
            status: "success",
          },
          {
            run_id: 11,
            sequence_id: 4,
            variant_id: "gemma-2-9b-it-fp16",
            tokens_per_second: 10.5,
            total_tokens: 861,
            total_time_seconds: 82.03,
            status: "success",
          },
          {
            run_id: 12,
            sequence_id: 5,
            variant_id: "gemma-2-9b-it-simpo",
            tokens_per_second: 6.46,
            total_tokens: 907,
            total_time_seconds: 140.4,
            status: "failed",
          },
          {
            run_id: 13,
            sequence_id: 1,
            variant_id: "llama-3.1-8b-instruct-4bit",
            tokens_per_second: 67.62,
            total_tokens: 667,
            total_time_seconds: 9.86,
            status: "success",
          },
          {
            run_id: 14,
            sequence_id: 2,
            variant_id: "llama-3.1-8b-instruct-8bit",
            tokens_per_second: 48.83,
            total_tokens: 1091,
            total_time_seconds: 22.34,
            status: "success",
          },
          {
            run_id: 15,
            sequence_id: 3,
            variant_id: "llama-3.1-8b-instruct-abliterated-4bit",
            tokens_per_second: 47.1,
            total_tokens: 465,
            total_time_seconds: 9.87,
            status: "failed",
          },
          {
            run_id: 16,
            sequence_id: 4,
            variant_id: "llama-3.1-8b-instruct-abliterated-q4-mlx",
            tokens_per_second: 30.88,
            total_tokens: 376,
            total_time_seconds: 12.18,
            status: "success",
          },
          {
            run_id: 17,
            sequence_id: 5,
            variant_id: "llama-3.1-8b-instruct-abliterated-8bit",
            tokens_per_second: 26.79,
            total_tokens: 418,
            total_time_seconds: 15.6,
            status: "failed",
          },
          {
            run_id: 18,
            sequence_id: 6,
            variant_id: "llama-3.1-8b-instruct-abliterated",
            tokens_per_second: 20.72,
            total_tokens: 469,
            total_time_seconds: 22.63,
            status: "success",
          },
          {
            run_id: 19,
            sequence_id: 7,
            variant_id: "llama-3.1-8b-instruct-abliterated-bfloat16",
            tokens_per_second: 19.74,
            total_tokens: 564,
            total_time_seconds: 28.58,
            status: "success",
          },
          {
            run_id: 20,
            sequence_id: 8,
            variant_id: "llama-3.1-8b-instruct-4bit",
            tokens_per_second: 65.5,
            total_tokens: 589,
            total_time_seconds: 8.99,
            status: "success",
          },
          {
            run_id: 21,
            sequence_id: 9,
            variant_id: "llama-3.1-8b-instruct-8bit",
            tokens_per_second: 48.45,
            total_tokens: 886,
            total_time_seconds: 18.29,
            status: "success",
          },
          {
            run_id: 22,
            sequence_id: 10,
            variant_id: "llama-3.1-8b-instruct-bf16",
            tokens_per_second: 27.08,
            total_tokens: 616,
            total_time_seconds: 22.74,
            status: "success",
          },
          {
            run_id: 23,
            sequence_id: 1,
            variant_id: "ministral-8b-instruct-2410-4bit",
            tokens_per_second: 63.38,
            total_tokens: 986,
            total_time_seconds: 15.56,
            status: "success",
          },
          {
            run_id: 24,
            sequence_id: 2,
            variant_id: "ministral-8b-instruct-2410-8bit",
            tokens_per_second: 45.78,
            total_tokens: 795,
            total_time_seconds: 17.36,
            status: "success",
          },
          {
            run_id: 25,
            sequence_id: 3,
            variant_id: "ministral-8b-instruct-2410-bf16",
            tokens_per_second: 26.06,
            total_tokens: 1127,
            total_time_seconds: 43.25,
            status: "success",
          },
          {
            run_id: 26,
            sequence_id: 1,
            variant_id: "qwen2.5-7b-instruct-uncensored-4bit",
            tokens_per_second: 63.53,
            total_tokens: 704,
            total_time_seconds: 11.08,
            status: "success",
          },
          {
            run_id: 27,
            sequence_id: 2,
            variant_id: "qwen2.5-7b-instruct-4bit",
            tokens_per_second: 66.75,
            total_tokens: 444,
            total_time_seconds: 6.65,
            status: "success",
          },
          {
            run_id: 28,
            sequence_id: 3,
            variant_id: "qwen2.5-7b-instruct-8bit",
            tokens_per_second: 42.27,
            total_tokens: 525,
            total_time_seconds: 12.42,
            status: "success",
          },
          {
            run_id: 29,
            sequence_id: 4,
            variant_id: "qwen2.5-7b-instruct-bf16",
            tokens_per_second: 29.93,
            total_tokens: 1377,
            total_time_seconds: 46.0,
            status: "failed",
          },
          {
            run_id: 30,
            sequence_id: 5,
            variant_id: "qwen2.5-7b-abliterated-v2-4bit",
            tokens_per_second: 68.02,
            total_tokens: 601,
            total_time_seconds: 8.84,
            status: "success",
          },
          {
            run_id: 31,
            sequence_id: 6,
            variant_id: "qwen2.5-7b-abliterated-v2-8bit",
            tokens_per_second: 32.67,
            total_tokens: 634,
            total_time_seconds: 19.41,
            status: "success",
          },
          {
            run_id: 32,
            sequence_id: 7,
            variant_id: "qwen2.5-7b-abliterated-v2",
            tokens_per_second: 29.8,
            total_tokens: 540,
            total_time_seconds: 18.12,
            status: "success",
          },
          {
            run_id: 33,
            sequence_id: 1,
            variant_id: "aya-expanse-8b-4bit",
            tokens_per_second: 64.71,
            total_tokens: 592,
            total_time_seconds: 9.15,
            status: "success",
          },
          {
            run_id: 34,
            sequence_id: 1,
            variant_id: "deepseek-coder-v2-lite-instruct-8bit",
            tokens_per_second: 50.5,
            total_tokens: 726,
            total_time_seconds: 14.38,
            status: "success",
          },
          {
            run_id: 35,
            sequence_id: 2,
            variant_id: "deepseek-coder-v2-lite-instruct-4bit-mlx",
            tokens_per_second: 52.52,
            total_tokens: 1122,
            total_time_seconds: 21.36,
            status: "success",
          },
          {
            run_id: 36,
            sequence_id: 1,
            variant_id: "llama-3-8b-instruct-4bit",
            tokens_per_second: 65.12,
            total_tokens: 568,
            total_time_seconds: 8.72,
            status: "success",
          },
          {
            run_id: 37,
            sequence_id: 2,
            variant_id: "llama-3-8b-instruct-8bit",
            tokens_per_second: 28.18,
            total_tokens: 479,
            total_time_seconds: 17.0,
            status: "failed",
          },
          {
            run_id: 38,
            sequence_id: 3,
            variant_id: "llama-3-8b-instruct",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 39,
            sequence_id: 4,
            variant_id: "llama-3-groq-8b-tool-use-4bit",
            tokens_per_second: 23.73,
            total_tokens: 247,
            total_time_seconds: 10.41,
            status: "failed",
          },
          {
            run_id: 40,
            sequence_id: 5,
            variant_id: "llama-3-groq-8b-tool-use-8bit",
            tokens_per_second: 9.14,
            total_tokens: 75,
            total_time_seconds: 8.21,
            status: "failed",
          },
          {
            run_id: 41,
            sequence_id: 6,
            variant_id: "llama-3-groq-8b-tool-use-bf16",
            tokens_per_second: 3.59,
            total_tokens: 29,
            total_time_seconds: 8.08,
            status: "failed",
          },
          {
            run_id: 42,
            sequence_id: 7,
            variant_id: "llama-3-8b-instruct-1048k-8bit",
            tokens_per_second: 10.28,
            total_tokens: 11,
            total_time_seconds: 1.07,
            status: "failed",
          },
          {
            run_id: 43,
            sequence_id: 1,
            variant_id: "mistral-7b-instruct-v0.2-4bit",
            tokens_per_second: 41.43,
            total_tokens: 10,
            total_time_seconds: 0.24,
            status: "failed",
          },
          {
            run_id: 44,
            sequence_id: 2,
            variant_id: "mistral-7b-instruct-v0.2-8bit-mlx",
            tokens_per_second: 46.81,
            total_tokens: 11,
            total_time_seconds: 0.23,
            status: "failed",
          },
          {
            run_id: 45,
            sequence_id: 3,
            variant_id: "mistral-7b-instruct-v0.3-4bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 46,
            sequence_id: 4,
            variant_id: "mistral-7b-instruct-v0.3-8bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 47,
            sequence_id: 5,
            variant_id: "mistral-7b-instruct-v0.3",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 48,
            sequence_id: 6,
            variant_id: "mistral-nemo-minitron-8b-instruct-4bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 49,
            sequence_id: 7,
            variant_id: "mistral-nemo-minitron-8b-instruct-8bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 50,
            sequence_id: 8,
            variant_id: "mistral-nemo-minitron-8b-instruct",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 51,
            sequence_id: 9,
            variant_id: "mistral-7b-hermes-2-pro-instruct-8bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 52,
            sequence_id: 10,
            variant_id: "mistral-7b-openhermes-2.5-4bit-mlx",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 53,
            sequence_id: 11,
            variant_id: "mistral-7b-nous-hermes-2-dpo-4bit-mlx",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 54,
            sequence_id: 12,
            variant_id: "mistral-7b-heimers-2-pro-instruct-4bit",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 55,
            sequence_id: 13,
            variant_id: "mistral7b-pairrm-sppo-iter3-unquantized",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 56,
            sequence_id: 14,
            variant_id:
              "mistral7b-inst-v0.2-4bit-mlx-distilabel-capybara-dpo-7k",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
          {
            run_id: 57,
            sequence_id: 15,
            variant_id: "capybarahermes-2.5-mistral-7b",
            tokens_per_second: 0.0,
            total_tokens: 0,
            total_time_seconds: 0.0,
            status: "failed",
          },
        ],
      },
    ],
    global_metadata: {
      total_models_tested: 10,
      total_variants_tested: 27,
      total_runs: 30,
      frameworks_used: ["MLX", "GGUF"],
      date_range: {
        start: "2024-11-15T15:49:13",
        end: "2024-11-16T18:27:08",
      },
      environment: {
        frontend: "open webui",
        backend: "LMStudio",
      },
    },
  };

  // Process the data
  const allRuns = jsonData.datasets.flatMap((dataset) => {
    const models = new Map(
      dataset.data?.models?.map((m) => [m.model_id, m]) || [],
    );
    const variants = new Map(
      dataset.data?.variants?.map((v) => [v.variant_id, v]) || [],
    );

    return (
      dataset.data?.runs
        ?.map((run) => {
          const variant = variants.get(run.variant_id);
          if (!variant) return null;
          const model = models.get(variant.base_model_id);
          if (!model) return null;

          return {
            ...run,
            variant: variant,
            model: model,
            size_gb: variant.size_gb,
            quantization: variant.quantization,
            framework: variant.framework,
            architecture_family: model.architecture_family,
          };
        })
        .filter(Boolean) || []
    );
  });

  // Filter successful runs, updated scatter plot data processing
  const successfulRuns = allRuns
    .filter((run) => run.status === "success" && run.model) // Make sure model exists
    .map((run) => ({
      ...run,
      sizeBracket: getSizeBracket(run.model),
      modelKey: `${run.architecture_family || "unknown"}-${getSizeBracket(run.model)}`,
    }));

  // Process quantization data
  const quantGroups = {};
  successfulRuns.forEach((run) => {
    if (!run.quantization) return; // Skip if quantization is missing
    const quant = run.quantization;
    if (!quantGroups[quant]) {
      quantGroups[quant] = { runs: [], quant };
    }
    quantGroups[quant].runs.push(run);
  });

  // Debug categorization
  successfulRuns.forEach((run) => {
    console.log(`Model: ${run.model.full_name}
      Size Bracket: ${run.sizeBracket}
      Original Size: ${run.size_gb}GB
      Performance: ${run.tokens_per_second} t/s
      Quantization: ${run.quantization}`);
  });

  // Group by base model
  const baseModelStats = {};
  successfulRuns.forEach((run) => {
    const baseKey = run.model.base_name;
    if (!baseModelStats[baseKey]) {
      baseModelStats[baseKey] = [];
    }
    baseModelStats[baseKey].push(run);
  });

  const quantData = Object.entries(quantGroups).map(([quant, group]) => ({
    name: quant,
    avgTPS:
      group.runs.reduce((sum, r) => sum + r.tokens_per_second, 0) /
      group.runs.length,
    count: group.runs.length,
    avgEfficiency:
      group.runs.reduce((sum, r) => sum + r.tokens_per_second / r.size_gb, 0) /
      group.runs.length,
  }));

  // Process family data
  const familyGroups = {};
  successfulRuns.forEach((run) => {
    const family = run.architecture_family || "unknown";
    if (!familyGroups[family]) {
      familyGroups[family] = { runs: [], family };
    }
    familyGroups[family].runs.push(run);
  });

  const familyData = Object.entries(familyGroups).map(([family, group]) => ({
    name: family,
    avgTPS:
      group.runs.reduce((sum, r) => sum + r.tokens_per_second, 0) /
      group.runs.length,
    count: group.runs.length,
  }));

  // Update quantization analysis
  const quantBySize = {};
  successfulRuns.forEach((run) => {
    if (!run.model || !run.quantization) return; // Skip if model or quantization is missing
    const bracket = getSizeBracket(run.model);
    if (bracket === "Unknown") return; // Skip models with unknown size
    const quant = run.quantization;
    if (!quantBySize[bracket]) quantBySize[bracket] = {};
    if (!quantBySize[bracket][quant]) quantBySize[bracket][quant] = [];
    quantBySize[bracket][quant].push(run);
  });

  // Update the quantSizeData calculation to properly calculate avgTPS first
  const quantSizeData = Object.entries(quantBySize).flatMap(
    ([bracket, quants]) =>
      Object.entries(quants).map(([quant, runs]) => {
        const avgTPS =
          runs.reduce((sum, r) => sum + r.tokens_per_second, 0) / runs.length;
        return {
          name: `${bracket}-${quant}`,
          bracket,
          quant,
          avgTPS,
          avgEfficiency:
            runs.reduce(
              (sum, r) => sum + r.tokens_per_second / (r.size_gb || 1),
              0,
            ) / runs.length,
          stdDev: Math.sqrt(
            runs.reduce(
              (sum, r) => sum + Math.pow(r.tokens_per_second - avgTPS, 2),
              0,
            ) / runs.length,
          ),
        };
      }),
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Model Size vs Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="size_gb" name="Size (GB)" />
                <YAxis
                  type="number"
                  dataKey="tokens_per_second"
                  name="Tokens/sec"
                />
                {/* Update ScatterChart tooltip */}
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p className="font-bold">{data.model.full_name}</p>
                          <p>Size: {data.size_gb.toFixed(2)} GB</p>
                          <p>
                            Speed: {data.tokens_per_second.toFixed(2)}{" "}
                            tokens/sec
                          </p>
                          <p>Quantization: {data.quantization}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {/* Update scatter plot grouping */}
                {successfulRuns.length > 0 &&
                  Array.from(new Set(successfulRuns.map((d) => d.modelKey)))
                    .filter((key) => !key.includes("Unknown")) // Optionally filter out Unknown models
                    .map((key, index) => (
                      <Scatter
                        key={key}
                        name={`${key.split("-")[0]} ${key.split("-")[1]}`}
                        data={successfulRuns.filter((d) => d.modelKey === key)}
                        fill={`hsl(${(index * 360) / 16}, 70%, 50%)`}
                      />
                    ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Performance by Quantization Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quantData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgTPS" name="Avg Tokens/sec" fill="#8884d8" />
                <Bar
                  dataKey="avgEfficiency"
                  name="Efficiency (Tokens/sec/GB)"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance by Model Family</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={familyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgTPS" name="Avg Tokens/sec" fill="#8884d8" />
                <Bar
                  dataKey="count"
                  name="Number of Successful Runs"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance by Model Size and Quantization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {/* Add error bars and grouping */}
              <BarChart
                data={quantSizeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quant" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Array.from(new Set(quantSizeData.map((d) => d.bracket))).map(
                  (bracket, index) => (
                    <Bar
                      key={bracket}
                      dataKey="avgTPS"
                      name={bracket}
                      fill={`hsl(${(index * 360) / 4}, 70%, 50%)`}
                      data={quantSizeData.filter((d) => d.bracket === bracket)}
                    >
                      {quantSizeData
                        .filter((d) => d.bracket === bracket)
                        .map((entry, index) => (
                          <ErrorBar
                            key={`err-${index}`}
                            dataKey="stdDev"
                            width={4}
                            strokeWidth={2}
                            stroke="#464646"
                          />
                        ))}
                    </Bar>
                  ),
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelPerformanceDashboard;
