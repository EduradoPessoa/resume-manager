import React, { useState, useRef } from 'react'
import { Button, Box, Typography } from '@mui/material'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageUploadProps {
  value?: string
  onChange: (base64: string) => void
  label?: string
  required?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  required = false,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  })
  const [tempImage, setTempImage] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const getCroppedImg = () => {
    if (!imageRef.current || !crop.width || !crop.height) return

    const canvas = document.createElement('canvas')
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      const base64Image = canvas.toDataURL('image/jpeg')
      onChange(base64Image)
      setTempImage(null)
    }
  }

  return (
    <Box className="image-upload">
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="image-upload-input"
      />

      <Box className="flex flex-col items-center gap-4">
        {tempImage ? (
          <>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
            >
              <img
                ref={imageRef}
                src={tempImage}
                alt="Upload preview"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </ReactCrop>
            <Box className="flex gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={getCroppedImg}
              >
                Confirmar
              </Button>
              <Button
                variant="outlined"
                onClick={() => setTempImage(null)}
              >
                Cancelar
              </Button>
            </Box>
          </>
        ) : (
          <>
            {value ? (
              <Box className="relative">
                <img
                  src={value}
                  alt="Current"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
                <Button
                  variant="outlined"
                  className="mt-2"
                  onClick={() => onChange('')}
                >
                  Remover
                </Button>
              </Box>
            ) : (
              <label htmlFor="image-upload-input">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Upload Foto
                </Button>
              </label>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default ImageUpload
