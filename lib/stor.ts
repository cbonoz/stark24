import { upload, uploadBuffer } from '@lighthouse-web3/sdk'
import { assertTrue } from './utils'

const LIGHTHOUSE_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE as string

const progressCallback = (progressData: any) => {
    let percentageDone =
        100 -
        ((progressData?.total / progressData?.uploaded) as any)?.toFixed(2)
    console.log(percentageDone)
}

// https://docs.lighthouse.storage/lighthouse-1/how-to/upload-data/file
export const uploadFile = async (files: any[]) => {
    // max 1 mb
    assertTrue(files.length === 1, 'Only one file allowed')
    const file = files[0]
    assertTrue(file.size < 1000000, 'File size must be less than 1mb')

    // const output = await uploadBuffer(data, LIGHTHOUSE_KEY)
    const output = await upload(
        files,
        LIGHTHOUSE_KEY,
        false,
        undefined,
        progressCallback
    )
    console.log('File Status:', output)
    /*
    output:
      data: {
        Name: "filename.txt",
        Size: 88000,
        Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
      }
    Note: Hash in response is CID.
  */
    return output.data.Hash
}
