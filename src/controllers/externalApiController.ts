import { Request, Response } from 'express';
import axios from 'axios';

// Fungsi untuk mendapatkan data provinsi
export const getProvinces = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://wilayah.id/api/provinces.json');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
};

// Fungsi untuk mendapatkan data kota/kabupaten berdasarkan kode provinsi
export const getRegencies = async (req: Request, res: Response) => {
  const { provinceCode } = req.params;
  try {
    const response = await axios.get(`https://wilayah.id/api/regencies/${provinceCode}.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch regencies' });
  }
};

// Fungsi untuk mendapatkan data kecamatan berdasarkan kode kabupaten
export const getDistricts = async (req: Request, res: Response) => {
  const { regencyCode } = req.params;
  try {
    const response = await axios.get(`https://wilayah.id/api/districts/${regencyCode}.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch districts' });
  }
};

// Fungsi untuk mendapatkan data desa berdasarkan kode kecamatan
export const getVillages = async (req: Request, res: Response) => {
  const { districtCode } = req.params;
  try {
    const response = await axios.get(`https://wilayah.id/api/villages/${districtCode}.json`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch villages' });
  }
};
